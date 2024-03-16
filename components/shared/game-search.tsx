import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import axios from "axios";
import { renderHTML } from "@/lib/utils";
import { Button } from "../ui/button";
import { useDebounce } from "@/hooks/use-debounce";

const GameSearch = ({
  placeholder = "Game title...",
  onGameSelect,
}: {
  placeholder?: string;
  onGameSelect: (game: any) => void;
}) => {
  const [inputValue, setInputValue] = useState<string>("");
  const [result, setResult] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [hasSelected, setHasSelected] = useState<boolean>(false);

  const debouncedValue = useDebounce(inputValue, 500);

  const fetchData = useCallback(async (value: string) => {
    if (value.length > 1 && !hasSelected) {
      setLoading(true);
      try {
        const response = await axios.get(`/api/bgg/name/${value}`);
        setResult(response.data || []);
      } catch (err) {
        setError("Failed to fetch games.");
      } finally {
        setLoading(false);
      }
    }
  }, []);

  useEffect(() => {
    fetchData(debouncedValue);
    if (hasSelected) setHasSelected(false);
  }, [debouncedValue, fetchData, hasSelected]);

  const onSelect = useCallback(
    async (item: any) => {
      setInputValue(item.name.value);
      setResult([]);
      setHasSelected(true);

      try {
        const response = await axios.get(`/api/bgg/id/${item.id}`);
        onGameSelect(response.data);
      } catch (error) {
        if (axios.isAxiosError(error)) {
          console.error(error.response?.data);
        }
      }
    },
    [onGameSelect]
  );

  const handleChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setInputValue(event.target.value);
    },
    []
  );

  return (
    <>
      <div className="flex-center min-h-[54px] w-full overflow-hidden rounded-full bg-grey-50 px-4 py-2">
        <Image
          src="/assets/icons/search.svg"
          alt="search"
          width={24}
          height={24}
        />
        <Input
          type="text"
          placeholder={placeholder}
          onChange={handleChange}
          value={inputValue}
          className="p-regular-16 border-0 bg-grey-50 outline-offset-0 placeholder:text-grey-500 focus:border-0 focus-visible:ring-0 focus-visible:ring-offset-0"
        />
      </div>
      {result.length > 0 && (
        <div className="flex flex-col h-[300px] w-full overflow-auto rounded-3xl bg-grey-50 px-4 py-2">
          {result.map((item) => (
            <Button
              key={item.id}
              variant="ghost"
              className="truncate justify-start text-sm w-full font-mono rounded-md"
              onClick={() => onSelect(item)}
              type="button"
            >
              <h2 className="text-left">{renderHTML(item.name.value)}</h2>
            </Button>
          ))}
        </div>
      )}
    </>
  );
};

export default GameSearch;
