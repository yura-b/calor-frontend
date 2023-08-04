import {PageSection} from '@/constants/interfaces/pageSection.ts';

export function removeDuplicateTitle (arr: PageSection[]){

   return arr.map((el)=>{
        if (Object.keys(el).includes('title') && Object.keys(el).includes('title')) {
            if (el.title === el.section) {
                return {
                    ...el,
                    title: null
                }
            }
        }
        return el
    })
}
