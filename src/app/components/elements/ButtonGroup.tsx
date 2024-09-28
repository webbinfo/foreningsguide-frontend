import Button from '../Button';
import { ButtonGroupProps } from '../../utils/interfaces';

export default function ButtonGroup({buttons, divBG, float} : ButtonGroupProps) {

    if (buttons && buttons?.length > 0) {
    return (
        <div className={`grid justify-center md:justify-${float || 'center'} align-middle py-4 grid-col space-y-2 ${buttons.length > 1 ? "sm:grid-cols-2" : null} ${buttons.length > 2 ? "md:grid-cols-3" : null} lg:flex lg:space-y-0 sm:px-8 lg:px-0 sm:gap-x-2`}>
                    {buttons && (
                        buttons.map(button => (
                            <Button key={button.id} id={button.id} text={button.text} link={button.link} newTab={button.newTab} type={button.type} icon={button.icon} divBG={divBG}/>
                        ))
                    )}
        </div>
    )
    }
    else {
        return null;
    }
}