import { FC } from 'react';
import { icons } from 'shared';

type TCheckFileExtension = {
  extensions: string[];
  bgColor: string;
  icon: FC;
};

export const checkFileExtension = (fileExtension: string): TCheckFileExtension => {
  const typeOfFiles = {
    docs: {
      extensions: ['pdf', 'txt', 'doc', 'docx'],
      bgColor: '#C4DBFF26',
      icon: icons.attachmentsIcons.FileTextIcon,
    },
    spreadsheets: {
      extensions: ['avi', 'mp4', 'wmv'],
      bgColor: '#FFC5421A',
      icon: icons.attachmentsIcons.MediaIcon,
    },
    media: {
      extensions: ['csv', 'xls', 'xlsx'],
      bgColor: '#82C43C14',
      icon: icons.attachmentsIcons.SpreadsheetIcon,
    },
  };
  const typeOfFilesArray = Object.values(typeOfFiles);
  return (
    typeOfFilesArray.find((typeOfFile) =>
      typeOfFile.extensions.find((extension) => extension === fileExtension),
    ) || typeOfFilesArray[0]
  );
};
