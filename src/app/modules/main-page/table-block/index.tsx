import { FC, useState } from "react";
import { TableComponent } from "../../../ui/components/table";
import { ChooseBlock } from "../chose-block";
import { ITableRow } from "../../../ui/components/table/interface";
import { IChoseValue } from "../../../ui/components/choose-value/interface";
import classname from './index.module.scss'

interface ITableBlock{
    name: string
}

export const TableBlock:FC<ITableBlock> = ({name}) => {
    const [tableRows, setTableRows] = useState<ITableRow[]>([])
    const [isStartAdd, setIsStartAdd] = useState(false)

    const onDeleteButtonClick = () => [
        setTableRows([])
    ]

    const onChoseAddClick = (entranceState: IChoseValue[], flatState: IChoseValue[]) => {
        let newTablesRows: ITableRow[] = []


        for (let i = 0; i < entranceState.length; i++) {
            const currentEntrance = entranceState[i]

            for (let j = 0; j < flatState.length; j++) {
                const currentFlat = flatState[j]

                if (currentEntrance.isSelected && currentFlat.isSelected) {
                    newTablesRows = [...newTablesRows, {
                        entrance: currentEntrance.value,
                        flat: currentFlat.value
                    }]
                }
            }
        }

        newTablesRows = newTablesRows.filter((item) => {
            return !tableRows.find(it => it.entrance === item.entrance && it.flat === item.flat)
        })        

        setTableRows([...tableRows, ...newTablesRows])
    }

    return (
        <div className={classname['table-block']}>
            <TableComponent
                name={name}
                rows={tableRows}
                onAddClick={() => {
                    setIsStartAdd(!isStartAdd)
                }}

                onDeleteClick={onDeleteButtonClick}
            />

            {
                isStartAdd && <ChooseBlock
                 onHideEntranceClick={() => {
                    setIsStartAdd(false)
                }} 
                onAddClick={onChoseAddClick} />
            }

        </div>
    )
}