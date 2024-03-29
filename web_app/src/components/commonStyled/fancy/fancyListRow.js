import styled, { css } from 'styled-components';
import variables from '../../../content/commonStyles/variables.scss';
import { borderCss } from './fancyBase';
import FancyButton from './fancyButton';
import FancyButtonLink from './fancyButtonLink';

const FancyListRow = styled.div`
    box-sizing: border-box;
    display: flex;
    flex-direction: row;
    border-left: ${borderCss}
    border-right: ${borderCss}
    border-bottom: ${borderCss}
    &:first-child{
        border-top: ${borderCss}
        ${props => props.noHeader !== false && css`
            background: ${variables.secondarycolor};
            border-top-left-radius: 25px;
            border-top-right-radius: 25px;
            color: white;
            font-weight: bold;
            border-color: gray;

            div${FancyListCell}{
                border-color: gray;
                align-items: center;
                justify-content: center;
            }
        `}
    }
`;

const FancyListCell = styled.div`
    box-sizing: border-box;
    display: flex;
    padding: 10px;
    border-right: ${borderCss}
    flex-grow: 0;
    flex-shrink: 0;
    flex-wrap: wrap;
    ${props => props.width && `width: ${props.width};`}
    ${props => props.center && 'justify-content: center;'}
    
    &:last-child{
        border-right: 0;
    }

    ${FancyButtonLink},${FancyButton}{
        margin-top: 2px;
        margin-bottom: 2px;
    }
`;

export default FancyListRow;
export { FancyListCell };