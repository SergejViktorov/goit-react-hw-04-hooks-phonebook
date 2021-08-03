import { useState } from 'react'
import { v4 as uuid } from 'uuid'

export default function ContactForm({ onCheckUnique, onAdd }) {
	const [name, setName] = useState('')
	const [number, setNumber] = useState('')

	const handleChange = ({ target }) => {
		const { name, value } = target

		switch (name) {
			case 'name':
				setName(value)
				break

			case 'number':
				setNumber(value)
				break

			default:
		}
	}

	const handleSubmit = (e) => {
		e.preventDefault()
		if (!validateForm()) return
		onAdd({ id: uuid(), name, number })

		reset()
	}

	const validateForm = () => {
		if (!name || !number) {
			alert('Some filed is empty')
			return false
		}
		return onCheckUnique(name)
	}

	const reset = () => {
		setName('')
		setNumber('')
	}

	return (
		<form onSubmit={handleSubmit}>
			<label>
				Name
				<input
					value={name}
					onChange={handleChange}
					type="text"
					name="name"
					placeholder="Enter name"
					pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
					title="Имя может состоять только из букв, апострофа, тире и пробелов. Например Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan и т. п."
					required
				/>
			</label>

			<label>
				Number
				<input
					value={number}
					onChange={handleChange}
					type="tel"
					name="number"
					placeholder="Enter number"
					pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
					title="Номер телефона должен состоять цифр и может содержать пробелы, тире, круглые скобки и может начинаться с +"
					required
				/>
			</label>
			<button type="submit">Add contact</button>
		</form>
	)
}
