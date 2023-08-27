import { FC } from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import { ReactSVG } from 'react-svg';
import downIcon from '@assets/images/downIcon.svg';

interface IProps {
    titles: string[]
    styles: React.CSSProperties
}

const CustomAccordion: FC<IProps> = ({ titles, styles }) => {
  return (
    <>
      {titles.map((title) => (
        <Accordion style={{...styles}}>
          <AccordionSummary
            style={{ padding: 0 }}
            expandIcon={<ReactSVG
              src={downIcon}
              beforeInjection={(svg) => {
                  svg.classList.add('icon');
                  svg.setAttribute('fill', '#404040');
              }}
          />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <Typography>{title}</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
              malesuada lacus ex, sit amet blandit leo lobortis eget.
            </Typography>
          </AccordionDetails>
        </Accordion>
      ))}
    </>
  );
}

export default CustomAccordion;