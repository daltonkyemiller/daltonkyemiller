import type { GetStaticProps, NextPage } from 'next';
import { PhotoGrid } from '@components';
import Image from 'next/image';

type HomeProps = {}

const Home: NextPage<HomeProps> = ({}) => {
    return (
        <div className={`flex flex-col justify-center items-center min-h-full`}>
            <h1 className={`text-5xl font-bold tracking-wide`}>WHO AM I?</h1>
            <Image src={'/img/temp/plants.jpg'} alt={'Plants'}/>
        </div>
    );
};

export default Home;
