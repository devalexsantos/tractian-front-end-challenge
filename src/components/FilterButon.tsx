interface FilterButtonsProps {
  onCheck: ({ }: any) => void;
  checked: boolean;
  icon: {
    svg: string;
    alt: string;
  };
  children: React.ReactNode;
}


export function FilterButton({
  onCheck,
  checked,
  icon,
  children
}: FilterButtonsProps) {
  return (
    <button
      onClick={onCheck}
      data-checked={checked}
      className="flex text-sm text-gray-600 font-medium items-center gap-2 bg-white rounded border py-[6px] pr-4 pl-[14px] data-[checked=true]:bg-blue-500 data-[checked=true]:text-white">
      {
        icon?.svg && (
          <div>
            <img src={icon.svg} alt={icon.alt} />
          </div>
        )
      }
      {children}
    </button>
  )
}
