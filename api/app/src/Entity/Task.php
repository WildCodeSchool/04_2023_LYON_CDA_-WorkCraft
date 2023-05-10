<?php

namespace App\Entity;

use ApiPlatform\Metadata\ApiResource;
use ApiPlatform\Metadata\Delete;
use ApiPlatform\Metadata\Get;
use ApiPlatform\Metadata\GetCollection;
use ApiPlatform\Metadata\Link;
use ApiPlatform\Metadata\Patch;
use ApiPlatform\Metadata\Post;
use App\Repository\TaskRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\DBAL\Types\Types;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Annotation\Groups;
use Symfony\Component\Validator\Constraints as Assert;

#[ORM\Entity(repositoryClass: TaskRepository::class)]
#[ApiResource(
    description: 'Task for WorkCraft',
    operations: [
        new Get(),
        new GetCollection(),
        new Post(),
        new Patch(),
        new Delete(),
    ],
    normalizationContext: [
        'groups' => ['task:read']
    ],
    denormalizationContext: [
        'groups' => ['task:write']
    ],
)]
#[ApiResource(
    uriTemplate: "/project_lists/{list_id}/tasks",
    operations: [new GetCollection()],
    uriVariables: [
        'list_id' => new Link(
            fromProperty: 'tasks',
            fromClass: ProjectList::class,
        )
        ],
        normalizationContext: [
            'groups' => ['task:read']
        ],
)]
class Task
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
    #[Assert\NotBlank]
    #[Groups(['task:read', 'task:write', 'list:read', 'project:write'])]
    private ?string $title = null;

    #[ORM\Column(type: Types::TEXT, nullable: true)]
    #[Groups(['task:read', 'task:write', 'list:read', 'project:write'])]
    private ?string $description = null;

    #[ORM\ManyToOne(inversedBy: 'tasks')]
    #[Groups(['task:read', 'task:write'])]
    private ?ProjectList $list = null;

    #[ORM\ManyToMany(targetEntity: User::class, inversedBy: 'tasks')]
    #[Groups(['task:read', 'user:read'])]
    private Collection $users;

    #[ORM\OneToMany(mappedBy: 'task', targetEntity: Module::class, orphanRemoval: true, cascade: ["persist"])]
    #[Groups(['task:read', 'list:read', 'project:write'])]
    private Collection $modules;

    public function __construct()
    {
        $this->users = new ArrayCollection();
        $this->modules = new ArrayCollection();
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

    public function getDescription(): ?string
    {
        return $this->description;
    }

    public function setDescription(?string $description): self
    {
        $this->description = $description;

        return $this;
    }

    public function getList(): ?ProjectList
    {
        return $this->list;
    }

    public function setList(?ProjectList $list): self
    {
        $this->list = $list;

        return $this;
    }

    /**
     * @return Collection<int, User>
     */
    public function getUsers(): Collection
    {
        return $this->users;
    }

    public function addUser(User $user): self
    {
        if (!$this->users->contains($user)) {
            $this->users->add($user);
        }

        return $this;
    }

    public function removeUser(User $user): self
    {
        $this->users->removeElement($user);

        return $this;
    }

    /**
     * @return Collection<int, Module>
     */
    public function getModules(): Collection
    {
        return $this->modules;
    }

    public function addModule(Module $module): self
    {
        if (!$this->modules->contains($module)) {
            $this->modules->add($module);
            $module->setTask($this);
        }

        return $this;
    }

    public function removeModule(Module $module): self
    {
        if ($this->modules->removeElement($module)) {
            // set the owning side to null (unless already changed)
            if ($module->getTask() === $this) {
                $module->setTask(null);
            }
        }

        return $this;
    }
}
