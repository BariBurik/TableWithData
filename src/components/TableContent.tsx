import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { tableAPI } from '@/service/tableService';
import TableRecord from '@/models/response/TableResponse';
import { useState } from 'react';
import TableModal from './Modal/TableModal';
import TableContentRecord from './TableContentRecord';

export default function TableContent() {

    // Получение записей из таблицы
    const table = tableAPI.useGetTableQuery(localStorage.getItem('xToken')).data?.data
    const [isOpen, setIsOpen] = useState<boolean>(false)
    if (table) {
        return (
            <div>
                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell>companySigDate</TableCell>
                                <TableCell align="right">companySignatureName</TableCell>
                                <TableCell align="right">documentName</TableCell>
                                <TableCell align="right">documentStatus</TableCell>
                                <TableCell align="right">documentType</TableCell>
                                <TableCell align="right">employeeNumber</TableCell>
                                <TableCell align="right">employeeSigDate</TableCell>
                                <TableCell align="right">employeeSignatureName</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                        {table.map((record: TableRecord) => (
                            <TableContentRecord record={record}/>
                        ))}
                        <TableRow>
                            <TableCell onClick={() => setIsOpen(true)} align='center' sx={{'&:hover': {cursor: 'pointer', backgroundColor: "#ececec"}, color: 'rgb(0, 102, 255)', fontSize: '20px'}} colSpan={9}>
                                +
                            </TableCell>
                        </TableRow>
                        </TableBody>
                    </Table>
                </TableContainer>
                <TableModal isOpen={isOpen} setIsOpen={setIsOpen}/>
            </div>
          );
    }

    return null;
}