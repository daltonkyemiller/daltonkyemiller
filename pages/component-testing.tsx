import type { NextPage } from 'next';
import { VisGrid } from '@components';

type ComponentTestingProps = {}

const ComponentTesting: NextPage<ComponentTestingProps> = ({}) => {
    return (
        <>
            {/*<VisGrid width={`50vmax`} height={`50vmax`} cols={10} rows={10} thickness={`2px`}/>*/}
            <VisGrid width={`75vmax`} height={`50vmax`} cols={10} thickness={`2px`}/>
        </>
    );
};

export default ComponentTesting;