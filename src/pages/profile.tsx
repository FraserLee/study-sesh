import { type NextPage } from 'next';
import Head from 'next/head';
import { signIn, signOut, useSession } from 'next-auth/react';
import { useState, useEffect } from 'react';
import Button from "../components/button";

import Avatar from "boring-avatars";




/*
const EditableField = ({ value, onChange }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [inputValue, setInputValue] = useState(value);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleCancel = () => {
    setIsEditing(false);
    setInputValue(value);
  };

  const handleSave = () => {
    setIsEditing(false);
    onChange(inputValue);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  return (
    <div className="flex flex-col">
      {isEditing ? (
        <div className="flex flex-row">
          <input className="text-black" value={inputValue} onChange={handleInputChange} />
          <button onClick={handleSave}>Save</button>
          <button onClick={handleCancel}>Cancel</button>
        </div>
      ) : (
        <div className="flex flex-row">
          <span>{value}</span>
          <button onClick={handleEdit}>Edit</button>
        </div>
      )}
    </div>
  );
};
*/


// (property) Session.user?: ({
//     id: string;
// } & {
//     name?: string | null | undefined;
//     email?: string | null | undefined;
//     image?: string | null | undefined;
// }) | undefined

const Profile = ({ user } : { user: any }) => {
  const name = user?.name || '';
  const email = user?.email || '';

  const image = user?.image ? (
    <img className="rounded-full w-24 h-24" src={user?.image} />
  ) : (
    <Avatar
      size={"6rem"}
      name={user?.name}
      variant="beam"
      colors={["#F2545B", "#A93E55", "#193230", "#F3F7F0", "#779CAB"]} 
    />
  );

  // display a profile section for the user, with a rounded image, name, and email
  return (
    <div className="flex flex-row items-start gap-2">
        {image}
        <div className="flex flex-col my-2">
          <p className="font-bold">{name}</p>
          <p className="text-sm">{email}</p>
        </div>
    </div>
  );

      
      





}

const ProfilePage: NextPage = () => {
  const { data: session, status } = useSession();
  const content = (() => {
    switch (status) {
      case 'loading': return <div>Loading...</div>;
      case 'authenticated': return <Profile user={session.user} />;
      case 'unauthenticated':
        return (
          <div>
            sign in or create an account to view your profile. duh. <br/><br/>
            <Button onClick={() => signIn()}>Sign in</Button>
          </div>
        );
    }
  })();

  return (
    <div className="container">
      <Head>
        <title>Profile</title>
      </Head>
      <main className="mx-auto min-h-screen flex flex-col items-left p-4 gap-2 w-fit ">
        <h1 className="text-6xl bg-[#6636305e] px-5 text-center mt-[calc(20vh)]">
          Profile
        </h1>
        {content}
      </main>
    </div>
  );
};


export default ProfilePage;
