import { Button, TableCell, TableRow } from "@mui/material";
import TableRecord from "@/models/response/TableResponse";
import { FC, useState } from "react";
import TableModal from "./Modal/TableModal";
import { tableAPI } from "@/service/tableService";

interface TableContentRecordProps {
    record: TableRecord
}

const TableContentRecord: FC<TableContentRecordProps> = ({record}) => {
    const [isOpen, setIsOpen] = useState<boolean>(false)

    // Получение функции удаления записи
    const [deleteRecord] = tableAPI.useDeleteRecordMutation();

    // Управление удалением записи
    const deletingRecord = async () => {
        await deleteRecord(record);
    }

    return ( 
            <TableRow
            key={record.id}
            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
                <TableCell component="th" scope="row">
                    {new Date(record.companySigDate).toLocaleString('ru-RU', {
                        year: 'numeric',
                        month: '2-digit',
                        day: '2-digit',
                        hour: '2-digit',
                        minute: '2-digit',
                    })}
                </TableCell>
                <TableCell align="right">{record.companySignatureName}</TableCell>
                <TableCell align="right">{record.documentName}</TableCell>
                <TableCell align="right">{record.documentStatus}</TableCell>
                <TableCell align="right">{record.documentType}</TableCell>
                <TableCell align="right">{record.employeeNumber}</TableCell>
                <TableCell align="right">{new Date(record.employeeSigDate).toLocaleString('ru-RU', {
                                            year: 'numeric',
                                            month: '2-digit',
                                            day: '2-digit',
                                            hour: '2-digit',
                                            minute: '2-digit',
                                        })}
                </TableCell>
                <TableCell align="right">{record.employeeSignatureName}</TableCell>
                <TableCell>
                    <Button onClick={() => setIsOpen(true)}>Изменить</Button>
                    <Button onClick={deletingRecord}>Удалить</Button>
                </TableCell>
                <TableModal isOpen={isOpen} setIsOpen={setIsOpen} record={record} isUpdate={true}/>
            </TableRow>

     );
}

export default TableContentRecord;