import type { GetStaticProps, NextPage } from 'next';
import { PhotoGrid } from '@components';

type HomeProps = {
    projects: Array<{ photos: string }>
}

const Home: NextPage<HomeProps> = ({projects}) => {
    return (
        <>
            {/*<PhotoGrid photos={projects.map(project => project.photos)}/>*/}
        </>
    );
};

export const getStaticProps: GetStaticProps = async (context) => {
    let projects = await fetch('https://mockend.com/daltonkyemiller/daltonkyemiller/projects?limit=25');
    let projectsRes = await projects.json() as HomeProps['projects'];
    return {
        props: {
            projects: projectsRes
        }
    };
};
export default Home;
