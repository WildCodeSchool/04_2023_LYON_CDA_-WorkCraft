<?php

namespace App\DataFixtures;

use App\Factory\ModuleFactory;
use App\Factory\ProjectFactory;
use App\Factory\ProjectListFactory;
use App\Factory\TaskFactory;
use App\Factory\UserFactory;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Persistence\ObjectManager;

class AppFixtures extends Fixture
{
    public function load(ObjectManager $manager): void
    {
        ProjectFactory::createMany(
            1,
            [
                'lists' => ProjectListFactory::new(
                    ['tasks' => TaskFactory::new(
                        ['modules' => ModuleFactory::new()->many(1, 4)]
                    )->many(5, 10)]
                )->many(5)
            ]
        );

        $manager->flush();
    }
}
