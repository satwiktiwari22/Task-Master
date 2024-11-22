// components/FileUploader.tsx
import React, { useRef } from "react";
import {
  Button,
  Stack,
  Typography,
  IconButton,
  Box,
  Chip,
} from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import DeleteIcon from "@mui/icons-material/Delete";
import InsertDriveFileIcon from "@mui/icons-material/InsertDriveFile";

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
    <Box
      sx={{
        p: 2,
        border: "1px dashed",
        borderColor: "primary.main",
        borderRadius: 2,
      }}
    >
      <Stack spacing={2}>
        <Button
          variant="outlined"
          startIcon={<CloudUploadIcon />}
          onClick={() => fileInputRef.current?.click()}
          sx={{
            height: "100px",
            border: "2px dashed",
            borderColor: "primary.main",
            "&:hover": {
              backgroundColor: "rgba(33, 150, 243, 0.04)",
            },
          }}
        >
          <Stack alignItems="center" spacing={1}>
            <Typography variant="subtitle1">Drop files here</Typography>
            <Typography variant="caption" color="textSecondary">
              or click to upload
            </Typography>
          </Stack>
        </Button>
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileSelect}
          style={{ display: "none" }}
          multiple
        />

        {files.length > 0 && (
          <Box sx={{ mt: 2 }}>
            <Typography variant="subtitle2" gutterBottom>
              Attached Files ({files.length})
            </Typography>
            {files.map((file, index) => (
              <Stack
                key={index}
                direction="row"
                alignItems="center"
                spacing={1}
                sx={{
                  p: 1,
                  mt: 1,
                  bgcolor: "background.default",
                  borderRadius: 1,
                  "&:hover": {
                    bgcolor: "action.hover",
                  },
                }}
              >
                <InsertDriveFileIcon color="primary" />
                <Typography variant="body2" sx={{ flexGrow: 1 }}>
                  {file.name}
                </Typography>
                <Chip
                  label={`${(file.size / 1024).toFixed(1)} KB`}
                  size="small"
                  variant="outlined"
                />
                <IconButton
                  size="small"
                  onClick={() => onFileRemove(file.name)}
                >
                  <DeleteIcon />
                </IconButton>
              </Stack>
            ))}
          </Box>
        )}
      </Stack>
    </Box>
  );
};

export default FileUploader;
