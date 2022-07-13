import React from 'react';
import { PhotoGrid } from '@components';
import { GetStaticProps } from 'next';

type ProjectsProps = {
    projects: Array<{ photos: string }>;
};

const Projects: React.FC<ProjectsProps> = ({ projects }: ProjectsProps) => {
    console.log(projects.map((p) => p.photos));

    return (
        <>
            <PhotoGrid photos={projects.map((project) => project.photos)} />
        </>
    );
};

export const getStaticProps: GetStaticProps = async (context) => {
    let projects = await fetch(
        'https://mockend.com/daltonkyemiller/daltonkyemiller/projects?limit=25'
    );
    let projectsRes = (await projects.json()) as ProjectsProps['projects'];
    return {
        props: {
            projects: projectsRes,
        },
    };
};
export default Projects;
