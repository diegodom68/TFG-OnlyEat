
import SearchIcon from '@mui/icons-material/Search';

const AddressSearch = () => {
  return (
    <div className="flex justify-center p-5 w-full">
      <div className="flex items-center space-x-2 border-2 border-gray-300 rounded-md focus-within:border-blue-500 w-full">
        <div className="pl-2">
          <SearchIcon className="text-gray-500" />
        </div>
        <input
          type="text"
          placeholder="Escribe una dirección..."
          className="p-2.5 flex-1 text-base focus:outline-none w-full"
        />
      </div>
    </div>
  );
};

export default AddressSearch;
