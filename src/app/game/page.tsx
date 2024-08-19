import LogoutButton from "@/components/buttons/LogoutButton";
import Game from "@/components/Game";
import InitiateGame from "@/components/InitiateGame";

const getGames = async () => {
  const response = await fetch(`http://localhost:5000/games`, {
    method: "GET",
    cache: "no-cache",
    headers: {
      "Content-Type": "application/json",
    },
  })

  if (!response.ok) {
    throw new Error(response.statusText);
  }

  return response.json();
}

export default async function Home() {
  const body = await getGames();
  console.log(body);
  if (!body.success) {
    return (
      <div>
        <p className="text-red-600 border-red-600 p-3 text-center">{body.messages[0]}</p>
      </div>
    )
  }

  return (
    <main className="flex flex-col items-center justify-between p-24">
      <div className="flex flex-row-reverse my-4 w-full">
        <LogoutButton />
      </div>
      {/* <Game /> */}
      <InitiateGame games={body.data} />
    </main>
  );
}
