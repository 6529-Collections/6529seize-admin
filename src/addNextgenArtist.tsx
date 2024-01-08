import React, { useState } from "react";
import { H4, Text, Button } from "@adminjs/design-system";
import axios from "axios";

export const UploadDistributionComponent: React.FC = (props: any) => {
  const [success, setSuccess] = useState<{
    status: boolean;
    artist_id?: number;
  }>({ status: false });

  const [uploadDisabled, setUploadDisabled] = useState(false);
  const [errors, setErrors] = React.useState<string[]>([]);

  const [name, setName] = React.useState<string>("");
  const [collectionId, setCollectionId] = React.useState<number>(0);
  const [bio, setBio] = React.useState<string>("");
  const [pfp, setPfp] = React.useState<File>();

  const [xLink, setXLink] = React.useState<string>("");
  const [igLink, setIgLink] = React.useState<string>("");
  const [discordHandle, setDiscordHandle] = React.useState<string>("");

  const handleUpload = async () => {
    setErrors([]);
    setUploadDisabled(true);
    const newerrors: string[] = [];

    if (!name) {
      newerrors.push("- missing name");
    }
    if (!collectionId) {
      newerrors.push("- missing collection ID");
    }
    if (!bio) {
      newerrors.push("- missing bio");
    }
    if (!pfp) {
      newerrors.push("- missing pfp");
    }

    if (newerrors.length > 0) {
      setErrors(newerrors);
      setUploadDisabled(false);
    } else {
      const newerrors: string[] = [];

      if (newerrors.length > 0) {
        setErrors(newerrors);
        setUploadDisabled(false);
      } else {
        setErrors([]);
        const formData = new FormData();
        formData.append("name", name);
        formData.append("collection_id", collectionId?.toString()!);
        formData.append("bio", bio);
        formData.append("pfp", pfp!);
        if (xLink) {
          formData.append("x_link", xLink);
        }
        if (igLink) {
          formData.append("ig_link", igLink);
        }
        if (discordHandle) {
          formData.append("discord_handle", discordHandle);
        }

        console.log("sending file form uploader");
        try {
          const response = await axios.post(
            "/create_nextgen_artist",
            formData,
            {
              headers: {
                "Content-Type": "multipart/form-data",
              },
            }
          );
          setSuccess({
            status: true,
            artist_id: response.data.id,
          });
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
      <H4>NEW NEXTGEN ARTIST</H4>
      <br />
      NAME
      <br />
      <input
        className="nextgenArtistInput"
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <br />
      Collection ID
      <br />
      <input
        className="nextgenArtistInput"
        type="number"
        min="0"
        value={collectionId > 0 ? collectionId : ""}
        onChange={(e) => setCollectionId(parseInt(e.target.value))}
      />
      <br />
      Bio
      <br />
      <textarea
        className="nextgenArtistInput"
        value={bio}
        rows={3}
        onChange={(e) => setBio(e.target.value)}
      />
      <br />
      PFP
      <input
        type="file"
        accept=".png,.jpg,.jpeg"
        className="nextgenArtistInput"
        onChange={(e) => setPfp(e.target.files ? e.target.files[0] : undefined)}
      />
      <br />
      X Link
      <br />
      <input
        className="nextgenArtistInput"
        type="text"
        value={xLink}
        onChange={(e) => setXLink(e.target.value)}
      />
      <br />
      Instagram Link
      <br />
      <input
        className="nextgenArtistInput"
        type="text"
        value={igLink}
        onChange={(e) => setIgLink(e.target.value)}
      />
      <br />
      Discord Handle
      <br />
      <input
        className="nextgenArtistInput"
        type="text"
        value={discordHandle}
        onChange={(e) => setDiscordHandle(e.target.value)}
      />
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
          {success.artist_id && (
            <>
              <br />
              <a
                href={`/resources/NextGenArtist/records/${success.artist_id}/show`}
                target="_blank">
                VIEW ARTIST
              </a>
            </>
          )}
        </Text>
      )}
    </div>
  );
};

export default UploadDistributionComponent;
