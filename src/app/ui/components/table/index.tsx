import { FC } from "react"
import { DeleteIcon } from "../icons/svg/delete"
import classname from './index.module.scss'
import { PlusIcon } from "../icons/svg/plus"
import { ITableRow } from "./interface"


interface ITableComponent {
    name: string
    rows: ITableRow[]
    onAddClick():void
    onDeleteClick(): void
}

export const TableComponent: FC<ITableComponent> = ({
    name,
    rows,
    onAddClick,
    onDeleteClick
}) => {
    return (
        <div className={classname['table-container']}>
            <div className={classname.heading}>
                {name}
                <div className={classname['button-container']}>
                    <button className={classname.button} onClick={onDeleteClick}>
                        <DeleteIcon />
                    </button>

                    <button className={classname.button} onClick={onAddClick}>
                        <PlusIcon />
                    </button>
                </div>
            </div>
            <div className={classname['body-container']}>
                <div className={classname['body-container-table--heading']}>
                <p className={classname['body-container-text']}>Номер подъезда</p>
                <p className={classname['body-container-text']}>Номер квартиры</p>
                </div>
                <div>
                {
                    rows.map(({entrance, flat}) => {
                        return (
                            <div key={`${entrance}/${flat}`} className={classname['body-container-row']}>
                                <p className={classname['body-container-row-element']}>{entrance}</p>
                                <p className={classname['body-container-row-element']}>{flat}</p>
                            </div>
                        )
                    })
                }
                </div>
            </div>
        </div>
    )
}