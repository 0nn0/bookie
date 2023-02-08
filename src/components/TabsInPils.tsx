function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

type TabInPil = {
  id: string;
  name: string;
  selected: boolean;
};

const TabsInPils = ({
  onClick,
  items = [],
}: {
  onClick: (id: any) => void;
  items: TabInPil[];
}) => {
  return (
    <nav className="flex space-x-4" aria-label="Tabs">
      {items.map((tab) => (
        <button
          key={tab.id}
          onClick={() => onClick(tab.id)}
          className={classNames(
            tab.selected
              ? 'bg-gray-200 text-gray-800'
              : 'text-gray-600 hover:text-gray-800',
            'rounded-md px-3 py-2 text-sm font-medium'
          )}
          aria-current={tab.selected ? 'page' : undefined}
        >
          {tab.name}
        </button>
      ))}
    </nav>
  );
};

export default TabsInPils;
