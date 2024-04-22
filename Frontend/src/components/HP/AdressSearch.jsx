import SearchIcon from '@mui/icons-material/Search';
import AddressAPI from '../API/AdressAPI';

const AddressSearch = () => {
  return (
    <div className="flex justify-center p-5 w-full">
      <div className="flex items-center  border-2 border-gray-500 rounded-full focus-within:border-orange-500 w-4/6">
        <div className="pl-2">
          <SearchIcon className="text-gray-500 mx-2" />
        </div>
        <AddressAPI 
        />
      </div>
    </div>
  );
};

export default AddressSearch;
