// components/FileUploader.tsx
import React, { useRef } from "react";
import { Button, Stack, Typography, IconButton } from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import DeleteIcon from "@mui/icons-material/Delete";

interface FileUploaderProps {
  onFileSelect: (files: File[]) => void;
  onFileRemove: (fileName: string) => void;
  files: File[];
}

const FileUploader: React.FC<FileUploaderProps> = ({
  onFileSelect,
  onFileRemove,
  files,
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      onFileSelect(Array.from(event.target.files));
    }
  };

  return (
    <Stack spacing={2}>
      <Button
        variant="outlined"
        startIcon={<CloudUploadIcon />}
        onClick={() => fileInputRef.current?.click()}
      >
        Upload Files
      </Button>
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileSelect}
        style={{ display: "none" }}
        multiple
      />
      {files.map((file, index) => (
        <Stack
          key={index}
          direction="row"
          alignItems="center"
          spacing={1}
          sx={{ mt: 1 }}
        >
          <Typography variant="body2" sx={{ flexGrow: 1 }}>
            {file.name}
          </Typography>
          <IconButton size="small" onClick={() => onFileRemove(file.name)}>
            <DeleteIcon />
          </IconButton>
        </Stack>
      ))}
    </Stack>
  );
};

export default FileUploader;
