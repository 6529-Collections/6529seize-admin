import React, { useEffect, useState } from "react";
import { H4, Text, Button } from "@adminjs/design-system";
import axios from "axios";
import { MEMELAB_CONTRACT, MEMES_CONTRACT } from "./constans";

export const UploadGenMemesAllowlistComponent: React.FC = (props: any) => {
  const [uploadDisabled, setUploadDisabled] = useState(false);
  const [errors, setErrors] = React.useState<string[]>([]);
  const [allowlistFile, setAllowlistFile] = React.useState<File | undefined>(
    undefined
  );

  const [responseMerkle, setResponseMerkle] = React.useState<string>();

  const handleUpload = async () => {
    setErrors([]);
    setUploadDisabled(true);
    const newerrors: string[] = [];

    if (!allowlistFile) {
      newerrors.push("- provide allowlist file");
    }

    if (newerrors.length > 0) {
      setErrors(newerrors);
      setUploadDisabled(false);
    } else {
      const formData = new FormData();
      if (allowlistFile) {
        formData.append("allowlist", allowlistFile);
      }

      console.log("sending file form uploader");
      try {
        const response = await axios.post("/genmemes_allowlist", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
        setAllowlistFile(undefined);
        setResponseMerkle(response.data);
        setUploadDisabled(false);
      } catch (err: any) {
        console.log(err);
        setErrors([
          `- Something went wrong during upload: ${err.response.data}`,
        ]);
        setUploadDisabled(false);
      }
    }
  };

  return (
    <div className="dashboardCard">
      <H4>New GenMemes Allowlist</H4>
      <br />
      <span style={{ fontWeight: "bold" }}>Upload Allowlist file</span>
      <br />
      <br />
      <ul>
        <li>
          CSV file with 2 columns:
          <ul>
            <li>&nbsp;&bull;&nbsp;address</li>
            <li>&nbsp;&bull;&nbsp;spots</li>
          </ul>
        </li>
      </ul>
      <br />
      <br />
      <input
        type="file"
        accept=".csv"
        className="uploadDistributionFile"
        onChange={(e) =>
          setAllowlistFile(e.target.files ? e.target.files[0] : undefined)
        }
      />
      <br />
      <br />
      <Button
        className="uploadDistributionBtn"
        onClick={handleUpload}
        disabled={uploadDisabled}>
        {uploadDisabled ? `Uploading...` : `Upload`}
      </Button>
      {errors.map((e, index) => (
        <Text key={`error-${index}`} color="error">
          {e}
        </Text>
      ))}
      {responseMerkle && (
        <Text>
          <br />
          <b>Upload Successful!</b>
          <br />
          <br />
          Merkle Root: {responseMerkle} <br />
          <br />
          <a href={`/resources/Collections/records/${responseMerkle}/show`}>
            VIEW COLLECTION
          </a>
          <br />
          <a
            href={`http://localhost:4000/resources/Allowlists?filters.merkle_root=${responseMerkle}`}>
            VIEW ALLOWLIST
          </a>
        </Text>
      )}
    </div>
  );
};

export default UploadGenMemesAllowlistComponent;
