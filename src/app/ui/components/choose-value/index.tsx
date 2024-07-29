import { FC } from 'react'
import classname from './index.module.scss'
import { CloseIcon } from '../icons/svg/close'
import { IChoseValue } from './interface'



interface IChoseValueComponent {
    name: string
    values: IChoseValue[]
    onCloseButton(): void
    onSelectValue(data: IChoseValue): void
    onAddButton?(): void
}

export const ChoseValueComponent: FC<IChoseValueComponent> = ({
    name,
    values,
    onCloseButton,
    onAddButton,
    onSelectValue
}) => {    
    return (
        <div id={name} className={classname.container}>
            <div className={classname.heading}>
                <p>{name}</p>
                <button className={classname['heading-button']} onClick={onCloseButton}>
                    <CloseIcon />
                </button>
            </div>
            <div className={classname['container-body']}>
                {
                    values.map((item) => {

                        return (
                            <button
                                key={item.value}
                                id={`${name} ${item.value}`}
                                className={classname[`container-body-element${item.isSelected ? "--selected" : ''}`]}
                                onClick={() => {
                                    onSelectValue(item)
                                }}
                                onKeyUp={(key) => {
                                    key.preventDefault()
                                    key.stopPropagation()
                                    if (key.code === 'ArrowDown') {
                                        const findElem =  document.getElementById(`${name} ${item.value + 1}`)
                                        if(findElem) {
                                            findElem.focus()
                                        }else{
                                            if(onAddButton){
                                                document.getElementById('add-button')?.focus()
                                            }else{
                                                document.getElementById(name)?.focus()
                                            } 
                                        }
                                    }

                                    if (key.code === 'ArrowUp') {
                                        const findElem =  document.getElementById(`${name} ${item.value - 1}`)
                                        if(findElem) {
                                            findElem.focus()
                                        }else{
                                            document.getElementById(name)?.focus()
                                        }
                                    }

                                    if (key.ctrlKey && key.code === 'Enter') {
                                        onAddButton && onAddButton()
                                    }
                                }}
                            >
                                {
                                    item.name
                                }
                            </button>
                        )
                    })
                }
                {
                    onAddButton && <button 
                    id={'add-button'} 
                    onClick={onAddButton} 
                    className={classname['container-body-button']}
                    disabled={!values.some(item => item.isSelected === true)}
                    >
                        Добавить
                    </button>
                }
            </div>
        </div>
    )
}