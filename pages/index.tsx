import type { GetStaticProps, NextPage } from 'next';
import { PhotoGrid } from '@components';
import Image from 'next/future/image';
import plants from '/public/img/temp/plants.jpg';

type HomeProps = {}

const Home: NextPage<HomeProps> = ({}) => {
    return (
        <div className={`flex flex-col justify-center items-center min-h-full`}>
            <h1 className={`text-5xl font-bold tracking-wide`}>WHO AM I?</h1>
            <Image src={plants} alt={`Plants`} className={`w-full`}/>
        </div>
    );
};

export default Home;
