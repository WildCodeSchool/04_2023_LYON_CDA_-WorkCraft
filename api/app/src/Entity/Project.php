<?php

namespace App\Entity;

use ApiPlatform\Doctrine\Orm\Filter\SearchFilter;
use ApiPlatform\Metadata\ApiFilter;
use ApiPlatform\Metadata\ApiResource;
use ApiPlatform\Metadata\Delete;
use ApiPlatform\Metadata\Get;
use ApiPlatform\Metadata\GetCollection;
use ApiPlatform\Metadata\Patch;
use ApiPlatform\Metadata\Post;
use App\Repository\ProjectRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Annotation\Groups;
use Symfony\Component\Validator\Constraints as Assert;

#[ORM\Entity(repositoryClass: ProjectRepository::class)]
#[ApiResource(
    description: 'Project for WorkCraft',
    operations: [
        new Get(),
        new GetCollection(),
        new Post(),
        new Patch(),
        new Delete(),
    ],
    normalizationContext: [
        'groups' => ['project:read']
    ],
    denormalizationContext: [
        'groups' => ['project:write']
    ],
)]
#[ApiFilter(SearchFilter::class, properties: ['owner.username' => 'partial'])]
class Project
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    #[Groups([
        'project:read',
        'list:read',
        'task:read',
        'module:read',
        'user:read',
    ])]
    private ?int $id = null;

    #[ORM\Column(length: 255)]
    #[Groups([
        'project:read',
        'project:write',
        'user:read',
    ])]
    #[Assert\NotBlank]
    private ?string $title = null;

    #[ORM\ManyToOne(inversedBy: 'projects')]
    #[Groups([
        'user:read',
        'project:read',
        'project:write',
    ])]
    private ?User $owner = null;

    #[ORM\OneToMany(mappedBy: 'project', targetEntity: ProjectList::class, orphanRemoval: true, cascade: ["persist"])]
    #[Groups([
        'project:read',
        'project:write',
        'list:read',
    ])]
    private Collection $lists;

    public function __construct()
    {
        $this->lists = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getTitle(): ?string
    {
        return $this->title;
    }

    public function setTitle(string $title): self
    {
        $this->title = $title;

        return $this;
    }

    public function getOwner(): ?User
    {
        return $this->owner;
    }

    public function setOwner(?User $owner): self
    {
        $this->owner = $owner;

        return $this;
    }

    /**
     * @return Collection<int, ProjectList>
     */
    public function getLists(): Collection
    {
        return $this->lists;
    }

    public function addList(ProjectList $list): self
    {
        if (!$this->lists->contains($list)) {
            $this->lists->add($list);
            $list->setProject($this);
        }

        return $this;
    }

    public function removeList(ProjectList $list): self
    {
        if ($this->lists->removeElement($list)) {
            // set the owning side to null (unless already changed)
            if ($list->getProject() === $this) {
                $list->setProject(null);
            }
        }

        return $this;
    }
}
