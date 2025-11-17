import React, { useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Upload } from "lucide-react";

const FileUpload = ({ label, onUpload, uploaded, disabled }) => {
    const inputRef = useRef();
    const [fileName, setFileName] = useState("");
    const [uploading, setUploading] = useState(false);

    const handleFileChange = async (e) => {
        const file = e.target.files[0];
        if (!file) return;
        setFileName(file.name);
        setUploading(true);
        try {
            await onUpload(file);
        } finally {
            setUploading(false);
        }
    };

    return (
        <div>
            <Label className="text-sm font-medium text-gray-700 mb-2 block">
                {label || "Arquivo do Documento"}
            </Label>
            <input
                type="file"
                ref={inputRef}
                className="hidden"
                onChange={handleFileChange}
                disabled={disabled || uploading}
            />
            <Button
                variant="outline"
                size="sm"
                className="gap-2"
                onClick={() => inputRef.current && inputRef.current.click()}
                disabled={disabled || uploading}
            >
                <Upload className="h-4 w-4" />
                {uploading ? "Enviando..." : fileName || "Upload Arquivo"}
            </Button>
            {uploaded && (
                <p className="text-xs text-green-600 mt-1">
                    Arquivo já enviado
                </p>
            )}
        </div>
    );
};

export default FileUpload;
