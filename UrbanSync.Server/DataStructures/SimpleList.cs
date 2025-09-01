namespace UrbanSync.Server.DataStructures {
    public class SimpleList<T> {
        private int _size = 0;
        private int _count = 0;
        public int Count { get;private set; }  
        public SimpleList(int size) {
           _size = size;    
        }
      
        T[] values = new T[100];
        public T this[int Index] {
            get => values[Index];
            set => values[Index] = value;
        }

        public void Add(T value) {
        values.Append(value);
            
        }
        public void Clear() {
            for (int i = 0; i < _count; i++) {
                values[i] = default!;
            }
        }
        public bool Contains(T value) {
        return values.Contains(value);
        }
    }
}
