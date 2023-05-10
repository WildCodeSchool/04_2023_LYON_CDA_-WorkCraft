<?php

namespace App\Entity;

use ApiPlatform\Metadata\ApiResource;
use ApiPlatform\Metadata\Delete;
use ApiPlatform\Metadata\Get;
use ApiPlatform\Metadata\GetCollection;
use ApiPlatform\Metadata\Link;
use ApiPlatform\Metadata\Patch;
use ApiPlatform\Metadata\Post;
use App\Repository\ModuleRepository;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Annotation\Groups;
use Symfony\Component\Validator\Constraints as Assert;

#[ORM\Entity(repositoryClass: ModuleRepository::class)]
#[ApiResource(
    description: 'Module for WorkCraft',
    operations: [
        new Get(),
        new GetCollection(),
        new Post(),
        new Patch(),
        new Delete(),
    ],
    normalizationContext: [
        'groups' => ['module:read']
    ],
    denormalizationContext: [
        'groups' => ['module:write']
    ],
)]
#[ApiResource(
    uriTemplate: "/tasks/{task_id}/modules",
    operations: [new GetCollection()],
    uriVariables: [
        'task_id' => new Link(
            fromProperty: 'modules',
            fromClass: Task::class,
        )
    ]
)]
class Module
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
    #[Groups([
        'module:read',
        'module:write',
        'list:read',
        'task:read',
        'project:write',
    ])]
    private ?string $title = null;

    #[ORM\Column]
    #[Groups([
        'module:read',
        'module:write',
        'list:read',
        'task:read',
        'project:write',
    ])]
    private ?bool $isDone = null;

    #[ORM\ManyToOne(inversedBy: 'modules')]
    #[Groups(['module:read', 'module:write'])]
    private ?Task $task = null;

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

    public function isIsDone(): ?bool
    {
        return $this->isDone;
    }

    public function setIsDone(bool $isDone): self
    {
        $this->isDone = $isDone;

        return $this;
    }

    public function getTask(): ?Task
    {
        return $this->task;
    }

    public function setTask(?Task $task): self
    {
        $this->task = $task;

        return $this;
    }
}
