import React from 'react';
import {useAppSelector} from '@/store/hooks/hooks.ts';
import Section from '@pages/admin/pageManager/components/Section.tsx';
import {removeDuplicateTitle} from '@/helpers/functions/removeDuplicateTitle.ts';
import {PageEnum} from '@/constants/enums/pages.enum.ts';
import {PageSection} from '@/constants/interfaces/pageSection.ts';


// interface IProps {
//   page: pageState,
//   editable: boolean
// }
//
// interface pageState {
//   state: PageSection[];
//   setState: React.Dispatch<React.SetStateAction<PageSection[]>>;
// }
const SectionGrid = () => {


    const {pageSections} = useAppSelector(state => state.pageManager)
    const benefits = removeDuplicateTitle(pageSections.filter(sections => sections.section === 'Benefits'))
    const PerfectFit = removeDuplicateTitle(pageSections.filter(sections => sections.section === 'Perfect Fit'))
    const YourVision = removeDuplicateTitle(pageSections.filter(sections => sections.section === 'Your Vision, Our Craftsmanship'))


    return (
        <div className={'flex flex-col gap-12 p-12'}>
            <SectionBlock arr={YourVision} title={'Your Vision, Our Craftsmanship'}/>
            <SectionBlock arr={PerfectFit} title={'Perfect Fit'}/>
            <SectionBlock arr={benefits} title={'Benefits'}/>
        </div>
    );
};

export default SectionGrid;


export const SectionBlock: React.FC<{
    arr: (PageSection | { title: null, page: PageEnum, value: string, _id: string, section: string })[],
    title: string
}> = ({arr, title}) => {

    return <div>
        <h1 className={'font-bold'}>{title}</h1>
        <div className={'flex flex-wrap gap-10'}>
            {
                arr.map((section) => {
                    return <Section {...section}/>
                })}
        </div>
    </div>
}
