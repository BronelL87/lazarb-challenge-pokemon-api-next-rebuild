interface FavoritesModalProps {
    isOpen: boolean;
    favorites: string[];
    onClose: () => void;
    onRemoveFavorite: (name: string) => void;
  }
  
  export default function FavoritesModal({
    isOpen, 
    favorites, 
    onClose, 
    onRemoveFavorite
  }: FavoritesModalProps) {
    if (!isOpen) return null;
  
    return (
      <div className="fixed inset-0 bg-opacity-50 flex justify-center items-center">
        <div className="dark:bg-gray-700 p-8 rounded-2xl w-96">
          <div className="flex justify-between items-center mb-4">
            <h2 className="flex text-2xl font-bold text-center">Favorites</h2>
            <button 
              onClick={onClose}
              className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
            >
              X
            </button>
          </div>
          <hr />
  
          {favorites.length == 0 ? (
            <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">No Favorites Yet</p>
          ) : (
            <ul>
              {favorites.map(name => (
                <li 
                  key={name} 
                  className="flex justify-between items-center mb-2 p-2 text-gray-500 dark:text-gray-400 rounded"
                >
                  {name}
                  <button 
                    onClick={() => onRemoveFavorite(name)}
                    className="text-gray-500 dark:text-gray-400"
                  >
                    x
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    );
  }