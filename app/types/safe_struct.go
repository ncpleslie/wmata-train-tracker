package types

import "sync"

type SafeStruct[T any] struct {
	value T
	mu    sync.RWMutex
}

func NewSafeStruct[T any](initialValue T) *SafeStruct[T] {
	return &SafeStruct[T]{
		value: initialValue,
	}
}

func (m *SafeStruct[T]) UpdateValue(newValue T) {
	m.mu.Lock()
	defer m.mu.Unlock()

	m.value = newValue
}

func (m *SafeStruct[T]) ReadValue() T {
	m.mu.RLock()
	defer m.mu.RUnlock()

	return m.value
}
