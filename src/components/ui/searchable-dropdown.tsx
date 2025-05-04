
import React, { useState, useEffect, useRef } from "react";
import { Input } from "@/components/ui/input";
import { X, ChevronDown } from "lucide-react";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

interface SearchableDropdownProps {
  options: { value: string; label: string }[];
  placeholder?: string;
  emptyMessage?: string;
  value: string;
  onValueChange: (value: string) => void;
  className?: string;
  onInputChange?: (value: string) => void;
  searchQuery: string;
  onSearchQueryChange: (value: string) => void;
}

const SearchableDropdown: React.FC<SearchableDropdownProps> = ({
  options,
  placeholder = "Выберите или начните вводить...",
  emptyMessage = "Ничего не найдено",
  value,
  onValueChange,
  className,
  searchQuery,
  onSearchQueryChange,
}) => {
  const [open, setOpen] = useState(false);
  const [filteredOptions, setFilteredOptions] = useState(options);
  const inputRef = useRef<HTMLInputElement>(null);

  // Filter options based on search query
  useEffect(() => {
    if (searchQuery.trim() === "") {
      setFilteredOptions(options);
    } else {
      const filtered = options.filter((option) =>
        option.label.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredOptions(filtered);
    }
  }, [searchQuery, options]);

  const handleSelect = (currentValue: string) => {
    onValueChange(currentValue);
    const selected = options.find((option) => option.value === currentValue);
    if (selected) {
      onSearchQueryChange(selected.label);
    }
    setOpen(false);
  };

  const handleClear = (e: React.MouseEvent) => {
    e.stopPropagation();
    onValueChange("");
    onSearchQueryChange("");
    inputRef.current?.focus();
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <div
          className={`relative flex items-center w-full cursor-pointer ${className}`}
          onClick={() => !open && setOpen(true)}
        >
          <Input
            ref={inputRef}
            type="text"
            placeholder={placeholder}
            value={searchQuery}
            onChange={(e) => {
              onSearchQueryChange(e.target.value);
              !open && setOpen(true);
            }}
            className="w-full pr-8"
            onKeyDown={(e) => {
              if (e.key === "Escape") {
                setOpen(false);
              }
            }}
          />
          {searchQuery ? (
            <X
              className="absolute right-3 h-4 w-4 opacity-50 hover:opacity-100"
              onClick={handleClear}
            />
          ) : (
            <ChevronDown className="absolute right-3 h-4 w-4 opacity-50" />
          )}
        </div>
      </PopoverTrigger>
      <PopoverContent
        className="w-full p-0"
        align="start"
        onOpenAutoFocus={(e) => e.preventDefault()}
        sideOffset={5}
      >
        <Command>
          <CommandList>
            <CommandEmpty>{emptyMessage}</CommandEmpty>
            <CommandGroup>
              {filteredOptions.map((option) => (
                <CommandItem
                  key={option.value}
                  value={option.label}
                  onSelect={() => handleSelect(option.value)}
                  className="flex items-center justify-between cursor-pointer"
                >
                  {option.label}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
};

export { SearchableDropdown };
