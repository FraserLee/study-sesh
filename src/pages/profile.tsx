import { type NextPage } from 'next';
import Head from 'next/head';
import { signIn, useSession } from 'next-auth/react';
import { useState } from 'react';
import Button from "../components/button";
import SignIn from "../components/signin";
import Avatar from "boring-avatars";
import { trpc } from '../utils/trpc';



const EditableField = ({ value, onChange } : { value: string, onChange: (value: string) => void }) => {
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
      name={user?.id}
      variant="beam"
      colors={["#F2545B", "#A93E55", "#193230", "#F3F7F0", "#779CAB"]} 
    />
  );

  const changeName = trpc.auth.changeName.useMutation();

  const updateName = (newName: string) => {
    setName(newName);
    changeName.mutate({ name: newName });
  };

  const { data: friends, isLoading } = trpc.auth.getFriends.useQuery();

  const friendList = friends?.map((friend: any) => (
    <li key={friend.id}>{friend.name}</li>
  ));

  // display a profile section for the user, with a rounded image, name, and email
  return (
    <div className="flex flex-row items-start gap-2 w-full">
        {image}
        <div className="flex flex-col my-2 w-full">
          <EditableField value={name} onChange={updateName} />
          <p className="text-xs">{email}</p>
        </div>
        <div className="flex flex-col w-full">
          <h2 className="text-lg">Friends</h2>
          {isLoading ? (
            <p>Loading...</p>
          ) : (
            <ul>
              {friendList}
            </ul>
          )}
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
            <SignIn />
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
