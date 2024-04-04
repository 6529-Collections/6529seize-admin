import React, { useState } from "react";
import { H4, Text, Button } from "@adminjs/design-system";
import axios from "axios";
import { MEMELAB_CONTRACT, MEMES_CONTRACT } from "./constans";

export const UploadDistributionComponent: React.FC = (props: any) => {
  const [success, setSuccess] = useState<{
    status: boolean;
    cardId?: number;
    contract?: string;
    file?: boolean;
    photos?: boolean;
  }>({ status: false });
  const [uploadDisabled, setUploadDisabled] = useState(false);
  const [errors, setErrors] = React.useState<string[]>([]);
  const [distributionContract, setDistributionContract] = React.useState<
    string | undefined
  >(undefined);
  const [distributionSnapshotBlock, setDistributionSnapshotBlock] =
    React.useState<number>();
  const [distributionCardId, setDistributionCardId] = React.useState<number>();
  const [distributionFile, setDistributionFile] = React.useState<
    File | undefined
  >(undefined);
  const [distributionPhotos, setDistributionPhotos] = React.useState<File[]>(
    []
  );

  const handleUpload = async () => {
    setErrors([]);
    setUploadDisabled(true);
    const newerrors: string[] = [];
    if (!distributionContract) {
      newerrors.push("- missing Contract");
    }
    if (!distributionCardId) {
      newerrors.push("- missing Card ID");
    }
    if (!distributionSnapshotBlock && distributionFile) {
      newerrors.push("- missing Distribution Block");
    }
    if (!distributionFile && distributionPhotos.length == 0) {
      newerrors.push("- provide at least one of distribution or photos");
    }

    if (newerrors.length > 0) {
      setErrors(newerrors);
      setUploadDisabled(false);
    } else {
      const newerrors: string[] = [];

      if (distributionFile) {
        const reader = new FileReader();
        reader.readAsText(distributionFile);
        reader.onload = async (event: any) => {
          if (event.target?.result) {
            const csvContent = event.target.result.toString();
            const csvRows = csvContent.split("\n");
            csvRows.map((row: string, index: number) => {
              try {
                if (row) {
                  const parts = row.split(",");
                  const phase = parts[0];
                  const wallet = parts[1];
                  const count = parts[2];

                  if (!phase || !wallet || !count) {
                    newerrors.push(`- something wrong at row index ${index}`);
                  }
                }
              } catch {
                newerrors.push(`- error at row index ${index}`);
              }
            });
          }
        };
      }
      if (newerrors.length > 0) {
        setErrors(newerrors);
        setUploadDisabled(false);
      } else {
        setErrors([]);
        try {
          const formData = new FormData();
          if (distributionFile) {
            formData.append("distribution", distributionFile);
          }
          formData.append("card_id", distributionCardId!.toString());
          formData.append("contract", distributionContract!);

          if (distributionSnapshotBlock) {
            formData.append(
              "snapshot_block",
              distributionSnapshotBlock.toString()
            );
          }
          distributionPhotos.map((dp, index) => {
            formData.append(`photo${index}`, dp);
          });
          console.log("sending file form uploader");
          await axios.post("/upload", formData, {
            timeout: 600000,
          });
          setSuccess({
            status: true,
            cardId: distributionCardId,
            contract: distributionContract,
            file: distributionFile != undefined && distributionFile != null,
            photos: distributionPhotos.length > 0,
          });
          setDistributionCardId(undefined);
          setDistributionSnapshotBlock(undefined);
          setDistributionContract("");
          setDistributionFile(undefined);
          setDistributionPhotos([]);
          setUploadDisabled(false);
        } catch (err: any) {
          console.log(err);
          setErrors([
            `- Something went wrong during upload: ${err.response.data}`,
          ]);
          setUploadDisabled(false);
        }
      }
    }
  };

  return (
    <div className="dashboardCard">
      <H4>NEW DISTRIBUTION PLAN</H4>
      <br />
      Contract&nbsp;&nbsp;
      {/* <input
        className="uploadDistributionInput"
        type="text"
        value={distributionContract !== undefined ? distributionContract : ""}
        onChange={(e) => setDistributionContract(e.target.value)}
      /> */}
      <select
        className="uploadDistributionDropdown"
        value={distributionContract !== undefined ? distributionContract : ""}
        onChange={(e) => setDistributionContract(e.target.value)}>
        <option value="" disabled>
          Choose contract
        </option>
        <option value={MEMES_CONTRACT}>THE MEMES ({MEMES_CONTRACT})</option>
        <option value={MEMELAB_CONTRACT}>MEME LAB ({MEMELAB_CONTRACT})</option>
      </select>
      <br />
      Card ID&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
      <input
        className="uploadDistributionInput uploadDistributionInputNumber"
        type="number"
        min="0"
        value={distributionCardId !== undefined ? distributionCardId : ""}
        onChange={(e) => setDistributionCardId(parseInt(e.target.value))}
      />
      <br />
      Snapshot Block&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
      <input
        className="uploadDistributionInput uploadDistributionInputNumber"
        type="number"
        min="0"
        value={
          distributionSnapshotBlock !== undefined
            ? distributionSnapshotBlock
            : ""
        }
        onChange={(e) => setDistributionSnapshotBlock(parseInt(e.target.value))}
      />
      <br />
      Distribution&nbsp;&nbsp;
      <input
        type="file"
        accept=".csv"
        className="uploadDistributionFile"
        onChange={(e) =>
          setDistributionFile(e.target.files ? e.target.files[0] : undefined)
        }
      />
      <br />
      Photos&nbsp;&nbsp;
      <input
        multiple
        type="file"
        accept="image/*"
        className="uploadDistributionFile"
        onChange={(e) => {
          setDistributionPhotos(
            e.target?.files
              ? [...distributionPhotos, ...e.target.files]
              : distributionPhotos
          );
        }}
      />
      {distributionPhotos.map((dp) => (
        <span key={dp.name} className="distributionPhoto">
          {dp.name}
        </span>
      ))}
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
      {success.status && (
        <Text>
          Upload Successful!
          {success.file && (
            <>
              <br />
              <a
                href={`/resources/Distribution?filters.contract=${success.contract}&filters.card_id=${success.cardId}`}
                target="_blank">
                VIEW DISTRIBUTION
              </a>
            </>
          )}
          {success.photos && (
            <>
              <br />
              <a
                href={`/resources/DistributionPhoto?filters.contract=${success.contract}&filters.card_id=${success.cardId}`}
                target="_blank">
                VIEW PHOTOS
              </a>
            </>
          )}
        </Text>
      )}
    </div>
  );
};

export default UploadDistributionComponent;
