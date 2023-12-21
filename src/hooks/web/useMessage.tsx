import type { ElMessageBoxOptions } from 'element-plus';
import { ElMessage, ElMessageBox } from 'element-plus';

function createElMessageBox(message: string, title: string, options: ElMessageBoxOptions) {
  ElMessageBox.confirm(message, title, options)
    .then(() => {})
    .catch(() => {});
}

function createErrorModal(message: string) {
  createElMessageBox(message, 'Error Tip', {
    confirmButtonText: 'OK',
    cancelButtonText: 'Close',
    type: 'error',
  });
}

function createErrorMsg(message: string) {
  ElMessage.error(message);
}

export function useMessage() {
  return {
    createErrorModal,
    createErrorMsg,
  };
}
