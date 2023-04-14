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
        UserFactory::createMany(5);
        ProjectFactory::createMany(3);
        ProjectListFactory::createMany(5, function () {
            return [
                'project' => ProjectFactory::random(),
            ];
        });
        TaskFactory::createMany(30, function () {
            return [
                'list' => ProjectListFactory::random(),
            ];
        });
        ModuleFactory::createMany(20, function () {
            return [
                'task' => TaskFactory::random(),
            ];
        });

        $manager->flush();
    }
}
