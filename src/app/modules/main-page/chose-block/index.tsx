import { FC, useEffect, useState } from "react";
import { ChoseValueComponent } from "../../../ui/components/choose-value";
import { IChoseValue } from "../../../ui/components/choose-value/interface";
import classname from "./index.module.scss";

interface IChoseBlock {
    onHideEntranceClick(): void
    onAddClick(entranceState: IChoseValue[], flatState: IChoseValue[]): void
}

export const ChooseBlock: FC<IChoseBlock> = ({ onAddClick, onHideEntranceClick }) => {

    const [isShowFlatPart, setIsShowFlatPart] = useState(false)

    const [entranceState, setEntranceState] = useState<IChoseValue[]>(Array.from({ length: 6 }, (_, ind): IChoseValue => {
        return {
            value: ind + 1,
            name: 'Подъезд ' + (ind + 1)
        }
    }))

    const handleChoseEntrance = (data: IChoseValue) => {
        setEntranceState((prevState) => {
            return prevState.map(item => {
                if (item.value === data.value) {
                    return {
                        ...item,
                        isSelected: !item.isSelected
                    }
                }
                return item
            })
        })
    }

    const [flatState, setFlatState] = useState<IChoseValue[]>(Array.from({ length: 6 }, (_, ind): IChoseValue => {
        return {
            value: ind + 1,
            name: 'Квартира ' + (ind + 1)
        }
    }))

    const handleChoseFlat = (data: IChoseValue) => {
        setFlatState((prevState) => {
            return prevState.map(item => {
                if (item.value === data.value) {
                    return {
                        ...item,
                        isSelected: !item.isSelected
                    }
                }
                return item
            })
        })
    }

    const handleAddButton = () => {
        onAddClick(entranceState, flatState)
        onHideEntranceClick()
    }

    useEffect(() => {
        if (entranceState.some(item => item.isSelected)) {
            setIsShowFlatPart(true)
        } else {
            setIsShowFlatPart(false)
        }
    }, [entranceState])


    return (
        <div className={classname['choose-block']}>
            <div
                className={classname['choose-block-item']}
                id={'Номер подъезда'}
                tabIndex={0 }
                onKeyUp={(key) => {
                    if (key.code === 'ArrowRight') {
                        document.getElementById('Номер квартиры')?.focus()
                    }

                    if (key.code === 'ArrowDown') {
                        const findElem =  document.getElementById(`Номер подъезда ${1}`)
                        if(findElem) {
                            findElem.focus()
                        }else{
                            document.getElementById('Номер квартиры')?.focus()
                        }
                    }
                }}>
                <ChoseValueComponent
                    onCloseButton={onHideEntranceClick}
                    name={'Номер подъезда'}
                    values={entranceState}
                    onSelectValue={handleChoseEntrance}
                />
            </div>
            {
                isShowFlatPart && <div
                    id={'Номер квартиры'}
                    className={classname['choose-block-item']}
                    tabIndex={1}
                    onKeyUp={(key) => {
                        if (key.code === 'ArrowLeft') {
                            document.getElementById('Номер подъезда')?.focus()
                        }

                        if (key.code === 'ArrowDown') {
                            const findElem =  document.getElementById(`Номер квартиры ${1}`)
                            if(findElem) {
                                findElem.focus()
                            }else{
                                document.getElementById('Номер подъезда')?.focus()
                            }
                        }

                        if (key.ctrlKey && key.code === 'Enter') {
                            handleAddButton()
                        }
                    }}>
                    <ChoseValueComponent
                        onCloseButton={() => {
                            setIsShowFlatPart(false)
                            setFlatState(prevState => prevState.map(item => ({ ...item, isSelected: false })))
                        }}
                        name={'Номер квартиры'}
                        values={flatState}
                        onSelectValue={handleChoseFlat}
                        onAddButton={handleAddButton}
                    />
                </div>
            }

        </div>
    )
}