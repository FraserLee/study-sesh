import { type NextPage } from 'next';
import Head from 'next/head';
import { signIn, useSession } from 'next-auth/react';
import { useState, useEffect } from 'react';
import Button from "../components/button";
import Avatar from "boring-avatars";




const EditableField = ({ value, onChange }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [inputValue, setInputValue] = useState(value);

  const edit = () => { setIsEditing(true); };

  const cancel = () => {
    setIsEditing(false);
    setInputValue(value);
  };

  const save = () => {
    setIsEditing(false);
    onChange(inputValue);
  };

  return (
    <div className="flex flex-col">
      {isEditing ? (
        <div className="flex flex-row">
          <input 
            className="px-2 py-1 text-white bg-[#6636305e] text-sm outline-none"
            value={inputValue} 
            onChange={
              (e: React.ChangeEvent<HTMLInputElement>) => { 
                setInputValue(e.target.value); 
          } } />
          <Button onClick={cancel}>cancel</Button>
          <Button onClick={save}>save</Button>
        </div>
      ) : (
        <div className="flex flex-row place-content-between">
          <span>{value}</span>
          <Button onClick={edit}>edit</Button>
        </div>
      )}
    </div>
  );
};


// (property) Session.user?: ({
//     id: string;
// } & {
//     name?: string | null | undefined;
//     email?: string | null | undefined;
//     image?: string | null | undefined;
// }) | undefined

const Profile = ({ user } : { user: any }) => {
  const [name, setName] = useState(user?.name || '');
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

  const updateName = (newName: string) => {
    setName(newName);
    alert("todo: update name in db");
  };

  // display a profile section for the user, with a rounded image, name, and email
  return (
    <div className="flex flex-row items-start gap-2 w-full">
        {image}
        <div className="flex flex-col my-2 w-full">
          <EditableField value={name} onChange={updateName} />
          <p className="text-xs">{email}</p>
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
      <main className="mx-auto min-h-screen flex flex-col items-left p-4 gap-2 w-[24rem] ">
        <h1 className="text-6xl bg-[#6636305e] px-5 text-center mt-[calc(20vh)] w-full">
          Profile
        </h1>
        {content}
      </main>
    </div>
  );
};


export default ProfilePage;
