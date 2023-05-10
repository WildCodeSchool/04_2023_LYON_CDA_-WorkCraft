<?php

namespace App\Factory;

use App\Entity\ProjectList;
use App\Repository\ProjectListRepository;
use Zenstruck\Foundry\ModelFactory;
use Zenstruck\Foundry\Proxy;
use Zenstruck\Foundry\RepositoryProxy;

/**
 * @extends ModelFactory<ProjectList>
 *
 * @method        ProjectList|Proxy create(array|callable $attributes = [])
 * @method static ProjectList|Proxy createOne(array $attributes = [])
 * @method static ProjectList|Proxy find(object|array|mixed $criteria)
 * @method static ProjectList|Proxy findOrCreate(array $attributes)
 * @method static ProjectList|Proxy first(string $sortedField = 'id')
 * @method static ProjectList|Proxy last(string $sortedField = 'id')
 * @method static ProjectList|Proxy random(array $attributes = [])
 * @method static ProjectList|Proxy randomOrCreate(array $attributes = [])
 * @method static ProjectListRepository|RepositoryProxy repository()
 * @method static ProjectList[]|Proxy[] all()
 * @method static ProjectList[]|Proxy[] createMany(int $number, array|callable $attributes = [])
 * @method static ProjectList[]|Proxy[] createSequence(iterable|callable $sequence)
 * @method static ProjectList[]|Proxy[] findBy(array $attributes)
 * @method static ProjectList[]|Proxy[] randomRange(int $min, int $max, array $attributes = [])
 * @method static ProjectList[]|Proxy[] randomSet(int $number, array $attributes = [])
 */
final class ProjectListFactory extends ModelFactory
{
    /**
     * @see https://symfony.com/bundles/ZenstruckFoundryBundle/current/index.html#factories-as-services
     *
     * @todo inject services if required
     */
    public function __construct()
    {
        parent::__construct();
    }

    /**
     * @see https://symfony.com/bundles/ZenstruckFoundryBundle/current/index.html#model-factories
     *
     * @todo add your default values here
     */
    protected function getDefaults(): array
    {
        return [
            'title' => self::faker()->words(3, true),
        ];
    }

    /**
     * @see https://symfony.com/bundles/ZenstruckFoundryBundle/current/index.html#initialization
     */
    protected function initialize(): self
    {
        return $this
            // ->afterInstantiate(function(ProjectList $projectList): void {})
        ;
    }

    protected static function getClass(): string
    {
        return ProjectList::class;
    }
}
