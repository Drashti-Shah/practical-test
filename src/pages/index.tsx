import axios from "axios";
import Carousel from "@/components/Carousel";
import LocationCard from "@/components/LocationCard";
import { HomeProps } from "@/utils/types";
import { martelSans } from "@/utils/font";

export default function Home({ data, error }: Readonly<HomeProps>) {
  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen text-center">
        <h1 className="text-red-500 text-2xl font-semibold mb-4">Error</h1>
        <p className="text-gray-700">{error}</p>
      </div>
    );
  }

  return (
    <main className="flex flex-col items-center justify-center min-h-screen mt-20 p-4 md:p-8 max-w-8xl md:max-w-8xl lg:max-w-8xl mx-auto">
      <section className="w-[85%] md:mb-80 mb-40 lg:mb-80">
        <h2
          className={`text-center ${martelSans.className} text-[#887C68] font-semibold text-[20px] md:text-[28px] leading-[1] tracking-[0%] uppercase mb-15 max-w-[400px] mx-auto`}
        >
          <span className="block md:inline">Communities </span>
          <span className="block md:inline">We Manage</span>
        </h2>
        <div className="w-full max-w-[1650px] mx-auto">
          <LocationCard locations={data} />
        </div>
      </section>

      <section className="w-full my-16 text-center">
        <h2
          className={`text-center ${martelSans.className} text-[#887C68] font-semibold text-[20px] md:text-[28px] leading-[1] tracking-[0%] uppercase mb-8 max-w-[400px] mx-auto`}
        >
          Our Services
        </h2>
        <div className="w-full max-w-[1650px] mx-auto">
          <Carousel images={data} />
        </div>
      </section>
    </main>
  );
}

export async function getServerSideProps() {
  try {
    const result = await axios.get("https://devsow.wpengine.com/wp-json/communities/all",
      {
        headers: {
          Authorization: `Basic ${process.env.NEXT_PUBLIC_API_AUTH_TOKEN}`,
          "Content-Type": "application/json",
        },
      }
    );

    const data = result.data?.data || [];

    return {
      props: {
        data,
        error: null,
      },
    };
  } catch (error: any) {
    console.error("Error fetching data:", error);

    let errorMessage;

    if (error.response) {
      errorMessage = `API Error: ${error.response.status} - ${error.response.statusText}`;
    } else if (error.request) {
      errorMessage = "Network Error: No response received from the server";
    } else {
      errorMessage = `Unexpected Error: ${error.message}`;
    }

    return {
      props: {
        data: [],
        error: errorMessage,
      },
    };
  }
}
