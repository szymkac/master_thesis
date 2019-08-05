import React, { Component } from 'react';
import { ExerciseBlockWrapper } from '../../styled'
import { RowContainer } from '../../../commonStyled';
import { ToutchColumn, PresureCircle } from '../../styled/exerciseAnimationItems'
import TimerBlock from './timerBlock';

const maxForce = 120; //temporary

class PressureBlock extends Component {
    presure0Ref = React.createRef();
    presure1Ref = React.createRef();
    presure2Ref = React.createRef();
    presure3Ref = React.createRef();
    presure4Ref = React.createRef();
    timerRef = React.createRef();

    valid = false;

    shouldComponentUpdate(nextProps) {
        const { deviceData, hand } = nextProps;
        if (!!deviceData) {
            this.setColor(this.presure0Ref, hand === 'right' ? deviceData.f[0] : deviceData.f[5]);
            this.setColor(this.presure1Ref, deviceData.f[1]);
            this.setColor(this.presure2Ref, deviceData.f[2]);
            this.setColor(this.presure3Ref, deviceData.f[3]);
            this.setColor(this.presure4Ref, deviceData.f[4]);
        }

        const valid = hand === 'right' ? this.validateForce(deviceData.f.slice(0, 5)) :
            this.validateForce(deviceData.f.slice(1, 6));

        if (!this.valid && valid)
            this.timerRef.current.start();
        else if (this.valid && !valid)
            this.timerRef.current.reset();
        
        // TODO Data collection
        this.valid = valid;

        return false;
    }

    setColor = (ref, force) => {
        const hue = ((1 - (force / maxForce)) * 120).toString(10);
        ref.current.style.background = `hsl(${hue},100%,50%)`;
    }

    validateForce = force => {
        const { options } = this.props.model;
        const validated = force.map(x => x >= options.threshold).filter(x => x);
        return options.rigor ? validated.length === 5 : validated.length > 0;
    }

    render() {
        const { hand, onStepDone, model } = this.props;

        return (
            <ExerciseBlockWrapper>
                <RowContainer noBorder height="20%">
                    <TimerBlock ref={this.timerRef}
                        secondsLimit={model.options.time}
                        beforeStartText="Pressure the device!!"
                        onTimerDone={onStepDone} />
                </RowContainer>
                <RowContainer noBorder height="80%">

                    {hand === 'right' &&
                        <ToutchColumn>
                            <PresureCircle ref={this.presure0Ref}>
                            </PresureCircle>
                        </ToutchColumn>
                    }

                    <ToutchColumn>
                        <PresureCircle ref={this.presure1Ref}>
                        </PresureCircle>
                    </ToutchColumn>

                    <ToutchColumn>
                        <PresureCircle ref={this.presure2Ref}>
                        </PresureCircle>
                    </ToutchColumn>

                    <ToutchColumn>
                        <PresureCircle ref={this.presure3Ref}>
                        </PresureCircle>
                    </ToutchColumn>

                    <ToutchColumn>
                        <PresureCircle ref={this.presure4Ref}>
                        </PresureCircle>
                    </ToutchColumn>

                    {hand === 'left' &&
                        <ToutchColumn>
                            <PresureCircle ref={this.presure0Ref}>
                            </PresureCircle>
                        </ToutchColumn>
                    }

                </RowContainer>
            </ExerciseBlockWrapper>
        );
    }
}

export default PressureBlock;