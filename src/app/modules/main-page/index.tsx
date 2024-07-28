import classname from "./index.module.scss";
import { TableBlock } from "./table-block";

export const MainPage = () => {


  return <div className={classname['main-page-container']}>
    <div className={classname['tables-contaoner']}>
      <TableBlock name="Дом 1" />
      <TableBlock name="Дом 2" />
      <TableBlock name="Дом 3" />
      <TableBlock name="Дом 4" />
    </div>
  </div>;
};
