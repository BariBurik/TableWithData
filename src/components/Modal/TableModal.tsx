import { FC, useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import TableRecord from '@/models/response/TableResponse';
import { Input } from '@mui/material';
import { tableAPI } from '@/service/tableService';
import classes from './TableModal.module.css'

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 600,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
  display: 'flex',
  flexDirection: 'column',
  gap: '20px'
};

interface TableModalProps {
  isOpen: boolean
  setIsOpen: (a: boolean) => void
  record?: TableRecord
  isUpdate?: boolean
}

const TableModal: FC<TableModalProps> = ({ isOpen, setIsOpen, record, isUpdate}) => {
  const handleClose = () => setIsOpen(false);
  const [newRecord, setNewRecord] = useState<TableRecord>({
    companySigDate: '',
    companySignatureName: '',
    documentName: '',
    documentStatus: '',
    documentType: '',
    employeeNumber: '',
    employeeSigDate: '',
    employeeSignatureName: '',
    id: '',
  } as TableRecord);
  
  // Помещаем старые данные пользователь решил обновить запись
  useEffect(() => {
    if (record) {
      setNewRecord(record);
    }
  }, [record]);

  // Полученик функций создания и обновления записи
  const [createRecord] = tableAPI.useCreateRecordMutation();
  const [updateRecord] = tableAPI.useUpdateRecordMutation();

  // функция управления созданием записи
  const creatingRecord = async () => {
    const newId = Date.now().toString();
    setNewRecord((prevRecord) => ({
      ...prevRecord,
      id: newId,
      companySigDate: new Date().toISOString(),
      employeeSigDate: new Date().toISOString(),
    }));

    await createRecord(newRecord);

    handleClose();
  };

  // функция управления обновлением записи
  const updatingRecord = async () => {
    await updateRecord(newRecord);
    handleClose();
  };

  return (
    <div>
      <Modal
        open={isOpen}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <div className={classes.row}>
            <Typography id="modal-modal-title" variant="h6" component="p">
              companySignatureName
            </Typography>
            <Input value={newRecord.companySignatureName} onChange={e => setNewRecord({...newRecord, companySignatureName: e.target.value})}></Input>
          </div>
          <div className={classes.row}>
            <Typography id="modal-modal-title" variant="h6" component="p">
              documentName
            </Typography>
            <Input value={newRecord.documentName} onChange={e => setNewRecord({...newRecord, documentName: e.target.value})}></Input>
          </div>
          <div className={classes.row}>
            <Typography id="modal-modal-title" variant="h6" component="p">
              documentStatus
            </Typography>
            <Input value={newRecord.documentStatus} onChange={e => setNewRecord({...newRecord, documentStatus: e.target.value})}></Input>
          </div>
          <div className={classes.row}>
            <Typography id="modal-modal-title" variant="h6" component="p">
              documentType
            </Typography>
            <Input value={newRecord.documentType} onChange={e => setNewRecord({...newRecord, documentType: e.target.value})}></Input>
          </div>
          <div className={classes.row}>
            <Typography id="modal-modal-title" variant="h6" component="p">
              employeeNumber
            </Typography>
            <Input value={newRecord.employeeNumber} onChange={e => setNewRecord({...newRecord, employeeNumber: e.target.value})}></Input>
          </div>
          <div className={classes.row}>
            <Typography id="modal-modal-title" variant="h6" component="p">
              employeeSignatureName
            </Typography>
            <Input value={newRecord.employeeSignatureName} onChange={e => setNewRecord({...newRecord, employeeSignatureName: e.target.value})}></Input>
          </div>
          <Button onClick={isUpdate ? updatingRecord : creatingRecord}>Подтвердить</Button>
        </Box>
      </Modal>
    </div>
  );
}

export default TableModal;