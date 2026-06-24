"use client";

import React, { useState } from "react";
import { Upload, FileSpreadsheet, CheckCircle2, AlertCircle, Download } from "lucide-react";
import { toast } from "sonner";
import * as XLSX from "xlsx";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { uploadService, UploadResponseDto } from "@/services/upload.service";
import { useAuthStore } from "@/store/useAuthStore";

export default function UploadsPage() {
  const { user } = useAuthStore();
  const [uploadType, setUploadType] = useState<"CANDIDATE" | "DRIVER">("CANDIDATE");
  const [file, setFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [result, setResult] = useState<UploadResponseDto | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
      setResult(null); // Clear previous results
    }
  };

  const handleUpload = async () => {
    if (!file || !user?.companyId || !user?.id) return;
    
    setIsUploading(true);
    try {
      const response = uploadType === "CANDIDATE" 
        ? await uploadService.uploadCandidates(file, user.companyId, user.id)
        : await uploadService.uploadDrivers(file, user.companyId, user.id);
        
      setResult(response);
      if (response.failedRows > 0) {
        toast.warning(`Upload completed with ${response.failedRows} errors.`);
      } else {
        toast.success(`All ${uploadType.toLowerCase()}s uploaded successfully!`);
      }
    } catch (error: any) {
      toast.error(error?.response?.data?.message || "File upload failed.");
    } finally {
      setIsUploading(false);
    }
  };

  const handleDownloadTemplate = () => {
    let ws;
    let fileName = "";
    if (uploadType === "CANDIDATE") {
      ws = XLSX.utils.aoa_to_sheet([
        ["Name", "Email", "Mobile", "Pickup Address", "Pickup Lat", "Pickup Lng", "Drop Address", "Drop Lat", "Drop Lng", "Shift Time"],
        ["John Doe", "john@example.com", "1234567890", "123 Start St", "18.5204", "73.8567", "456 End Ave", "18.5590", "73.7868", "09:00"]
      ]);
      fileName = "Candidate_Upload_Template.xlsx";
    } else {
      ws = XLSX.utils.aoa_to_sheet([
        ["Name", "Email", "Mobile", "License Number", "License Expiry", "Aadhaar Number", "PAN Number"],
        ["Jane Smith", "jane@example.com", "0987654321", "DL-1234567", "2030-12-31", "123456789012", "ABCDE1234F"]
      ]);
      fileName = "Driver_Upload_Template.xlsx";
    }
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Template");
    XLSX.writeFile(wb, fileName);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Bulk Uploads</h1>
          <p className="text-muted-foreground mt-1">
            Upload Excel (.xlsx) files to mass import Candidates or Drivers into your organization.
          </p>
        </div>
        <div className="flex flex-col sm:flex-row gap-2">
          <div className="flex bg-muted p-1 rounded-lg">
            <button
              className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${
                uploadType === "CANDIDATE" ? "bg-background shadow-sm text-foreground" : "text-muted-foreground hover:text-foreground"
              }`}
              onClick={() => { setUploadType("CANDIDATE"); setResult(null); setFile(null); }}
            >
              Candidates
            </button>
            <button
              className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${
                uploadType === "DRIVER" ? "bg-background shadow-sm text-foreground" : "text-muted-foreground hover:text-foreground"
              }`}
              onClick={() => { setUploadType("DRIVER"); setResult(null); setFile(null); }}
            >
              Drivers
            </button>
          </div>
          <Button variant="outline" onClick={handleDownloadTemplate} className="shrink-0 h-10">
            <Download className="mr-2 h-4 w-4" />
            Download {uploadType === "CANDIDATE" ? "Candidate" : "Driver"} Template
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>{uploadType === "CANDIDATE" ? "Candidate Import" : "Driver Import"}</CardTitle>
            <CardDescription>
              {uploadType === "CANDIDATE" 
                ? "Columns required: Name, Email, Mobile, Pickup Address, Pickup Lat, Pickup Lng, Drop Address, Drop Lat, Drop Lng, Shift Time."
                : "Columns required: Name, Email, Mobile, License Number, License Expiry (YYYY-MM-DD), Aadhaar Number, PAN Number."
              }
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="border-2 border-dashed border-border rounded-xl p-8 flex flex-col items-center justify-center text-center bg-zinc-50 dark:bg-zinc-900/50">
              <FileSpreadsheet className="h-10 w-10 text-muted-foreground mb-4" />
              <p className="text-sm font-medium mb-2">Drag and drop your Excel file here</p>
              <p className="text-xs text-muted-foreground mb-4">Or click to browse</p>
              <input
                type="file"
                accept=".xlsx, .xls"
                onChange={handleFileChange}
                className="hidden"
                id="file-upload"
              />
              <label htmlFor="file-upload">
                <Button variant="outline" className="pointer-events-none">
                  Select File
                </Button>
              </label>
              {file && <p className="mt-4 text-sm text-primary font-medium">{file.name}</p>}
            </div>

            <Button 
              className="w-full" 
              onClick={handleUpload} 
              disabled={!file || isUploading}
            >
              <Upload className="mr-2 h-4 w-4" />
              {isUploading ? "Uploading..." : "Start Upload"}
            </Button>
          </CardContent>
        </Card>

        {result && (
          <Card className={result.failedRows > 0 ? "border-red-200 dark:border-red-900" : "border-green-200 dark:border-green-900"}>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                {result.failedRows === 0 ? <CheckCircle2 className="text-green-500" /> : <AlertCircle className="text-red-500" />}
                Upload Results
              </CardTitle>
              <CardDescription>Status: {result.status}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-3 gap-4 text-center">
                <div className="bg-muted rounded-md p-3">
                  <div className="text-2xl font-bold">{result.totalRows}</div>
                  <div className="text-xs text-muted-foreground">Total Rows</div>
                </div>
                <div className="bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 rounded-md p-3">
                  <div className="text-2xl font-bold">{result.successRows}</div>
                  <div className="text-xs opacity-80">Successful</div>
                </div>
                <div className="bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400 rounded-md p-3">
                  <div className="text-2xl font-bold">{result.failedRows}</div>
                  <div className="text-xs opacity-80">Failed</div>
                </div>
              </div>

              {result.errors && result.errors.length > 0 && (
                <div className="mt-4 border rounded-md overflow-hidden">
                  <div className="bg-red-50 dark:bg-red-950 p-2 text-sm font-semibold text-red-700 dark:text-red-400 border-b">
                    Row Errors
                  </div>
                  <div className="max-h-[200px] overflow-y-auto p-2 text-sm space-y-2">
                    {result.errors.map((err, i) => (
                      <div key={i} className="flex flex-col border-b last:border-0 pb-2 mb-2 last:mb-0 last:pb-0">
                        <span className="font-medium text-red-600 dark:text-red-400">Row {err.rowNumber}: {err.message}</span>
                        <span className="text-xs text-muted-foreground">Column: {err.columnName} | Value: {err.rawValue}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
