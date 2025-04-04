// src/components/events/ShareModal.js
const ShareModal = ({ isOpen, onClose, eventId, eventData }) => {
    const shareLinks = [
      {
        platform: 'Facebook',
        url: `https://www.facebook.com/sharer/sharer.php?u=${window.location.href}`
      },
      {
        platform: 'Twitter',
        url: `https://twitter.com/intent/tweet?text=Check out this event: ${eventData.title}&url=${window.location.href}`
      },
      {
        platform: 'LinkedIn',
        url: `https://www.linkedin.com/sharing/share-offsite/?url=${window.location.href}`
      }
    ];
  
    const copyToClipboard = () => {
      navigator.clipboard.writeText(window.location.href);
      setAlert({ type: 'success', message: 'Link copied to clipboard!' });
    };
  
    return (
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Share Event</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4">
            {shareLinks.map((link) => (
              <a
                key={link.platform}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-2 p-2 rounded-md hover:bg-gray-100"
              >
                <span>{link.platform}</span>
              </a>
            ))}
            <button
              onClick={copyToClipboard}
              className="flex items-center justify-center space-x-2 p-2 rounded-md border hover:bg-gray-100"
            >
              <span>Copy Link</span>
            </button>
          </div>
        </DialogContent>
      </Dialog>
    );
  };
  
  // src/components/categories/CategoryManager.js
  const CategoryManager = () => {
    const [categories, setCategories] = useState([]);
    const [newCategory, setNewCategory] = useState('');
    const [loading, setLoading] = useState(true);
  
    useEffect(() => {
      const fetchCategories = async () => {
        const querySnapshot = await getDocs(collection(db, 'categories'));
        setCategories(querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        })));
        setLoading(false);
      };
  
      fetchCategories();
    }, []);
  
    const addCategory = async () => {
      if (!newCategory.trim()) return;
  
      try {
        const docRef = await addDoc(collection(db, 'categories'), {
          name: newCategory.trim(),
          slug: newCategory.trim().toLowerCase().replace(/\s+/g, '-'),
          createdAt: new Date().toISOString()
        });
  
        setCategories([...categories, {
          id: docRef.id,
          name: newCategory,
          slug: newCategory.trim().toLowerCase().replace(/\s+/g, '-')
        }]);
        setNewCategory('');
      } catch (error) {
        setAlert({ type: 'error', message: 'Failed to add category' });
      }
    };
  
    return (
      <div className="space-y-4">
        <div className="flex space-x-2">
          <input
            type="text"
            value={newCategory}
            onChange={(e) => setNewCategory(e.target.value)}
            placeholder="New category name"
            className="flex-1 px-4 py-2 border rounded-md"
          />
          <button
            onClick={addCategory}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            Add Category
          </button>
        </div>
  
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {categories.map(category => (
            <div
              key={category.id}
              className="p-4 border rounded-md hover:shadow-md transition-shadow"
            >
              <h3 className="font-semibold">{category.name}</h3>
              <p className="text-sm text-gray-500">Slug: {category.slug}</p>
            </div>
          ))}
        </div>
      </div>
    );
  };
export default ShareModal;