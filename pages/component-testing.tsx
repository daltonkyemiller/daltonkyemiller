import type { NextPage } from 'next';
import { VisGrid } from '@components';
import FloatingCards from '../components/FloatingCards/FloatingCards';

type ComponentTestingProps = {};

const ComponentTesting: NextPage<ComponentTestingProps> = ({}) => {
    return (
        <div className={`flex h-screen w-screen items-center justify-center`}>
            <FloatingCards />
        </div>
    );
};

export default ComponentTesting;
