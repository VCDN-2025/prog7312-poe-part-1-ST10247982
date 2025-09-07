using System.Collections;

namespace UrbanSync.Server.DataStructures {
    public class SimpleList<T>:IEnumerable<T> {
        private int _size = 0;
        private int _count = 0;
        public int Count { get; private set; }
        public SimpleList() {
            _size = 100;
        }
        public SimpleList(int size) {
        _size =size;    
        }
        T[] values = new T[100];
        public T this[int Index] {
            get => values[Index];
            set => values[Index] = value;
        }

        public void Add(T value) {
            if (_size == _count) {
                Resize();
            }
       
            values[_count] = value;
            _count++;
        }
        
        private void Resize() {
            // i was going to use Array.Copy to be efficient as it does more low level work but
            // there is also Array.Resize which is more tempting, howver I felt that it would do the work for me
            // hence i did it manually with a loop. 
            T[] newArray = new T[_size * 2];
            for (int i = 0; i < values.Length; i++) {
                newArray[i] = values[i];
            }
        }
        public int ContainsAt(T Value) {
            if (!Contains(Value)) return -1;
            int foundIndex = 0;
            for (int i = 0; i < _size; i++) {
                if (values[i]!.Equals(Value)) {
                    foundIndex = i;
                }
            }
            return foundIndex; ;
        }
        public bool Contains(T value) {
            return values.Contains(value);
        }
        public T PeekStart() => values[0];
        public T PeekEnd() => values[_size];
        public T Pop() {
            T poppedValue = values[0];
            _size--;
            values[_size] = default!;
              return poppedValue;   
        }
        public void Clear() {
            for (int i = 0; i < _count; i++) {
                values[i] = default!;
            }
        }

        public IEnumerator<T> GetEnumerator() {

            foreach(T item in values) {
                yield return item;
            }
        }

        IEnumerator IEnumerable.GetEnumerator() {
            return GetEnumerator();
        }
    }
}
