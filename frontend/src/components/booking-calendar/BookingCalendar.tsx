import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { ChevronLeft, ChevronRight, Calendar, CalendarDays, Loader2, FileSliders } from "lucide-react";
import { cn } from "@/utils/utils";
import { Button } from "@/components/booking-calendar/ui/button";
import { useToast } from "@/hooks/use-toast";

import  {toast as _toast} from 'react-toastify';

import env from '@/config/env.config';

import './calendar.css';
import axiosInstance from "@/services/axiosInstance";

const strings = {
	en: {
		ROOM_LABEL: "Room",
		TO_LABEL: "to",
		LOADING_CALENDAR: "Loading calendar...",
		SELECT_AVAILABILITY_DATES: "Select dates to check availability",
		TOTAL_NIGHTS: "Total nights",
		SELECT_DATE: "Select date",
		PREVIOUS_MONTH_BTN: "Previous",
		NEXT_MONTH_BTN: "Next",
		CLEAR_SELECTION: "Clear Selection",
		BOOK_NOW_BUTTON: "Book Now",
		TOAST_DATE_CONFLICT: "Your selection contains booked dates. Please select a different range.",
		TOAST_MISSING_STAYING_DATES: "Please select check-in and check-out dates first.",
		TOAST_DATES_AVAILABLE: "Your selected dates are available for booking.",
		TOAST_DATES_CONFLICT: "Some dates in your selection are already booked.",
		TOAST_FAILED_AVAILABILITY_CHECK: "Failed to check availability. Please try again."
	},
	it: {
		ROOM_LABEL: "Camera",
		TO_LABEL: "a",
		LOADING_CALENDAR: "Caricamento calendario...",
		SELECT_AVAILABILITY_DATES: "Seleziona le date per verificare la disponibilità",
		TOTAL_NIGHTS: "Notti totali",
		SELECT_DATE: "Seleziona data",
		PREVIOUS_MONTH_BTN: "Precedente",
		NEXT_MONTH_BTN: "Successivo",
		CLEAR_SELECTION: "Cancella selezione",
		BOOK_NOW_BUTTON: "Prenota ora",
		TOAST_DATE_CONFLICT: "La tua selezione contiene date già prenotate. Seleziona un intervallo diverso.",
		TOAST_MISSING_STAYING_DATES: "Seleziona prima le date di check-in e check-out.",
		TOAST_DATES_AVAILABLE: "Le date selezionate sono disponibili per la prenotazione.",
		TOAST_DATES_CONFLICT: "Alcune date della selezione sono già prenotate.",
		TOAST_FAILED_AVAILABILITY_CHECK: "Impossibile verificare la disponibilità. Riprova."
	},
	fr: {
		ROOM_LABEL: "Chambre",
		TO_LABEL: "à",
		LOADING_CALENDAR: "Chargement du calendrier...",
		SELECT_AVAILABILITY_DATES: "Sélectionnez les dates pour vérifier la disponibilité",
		TOTAL_NIGHTS: "Nombre total de nuits",
		SELECT_DATE: "Sélectionner une date",
		PREVIOUS_MONTH_BTN: "Précédent",
		NEXT_MONTH_BTN: "Suivant",
		CLEAR_SELECTION: "Effacer la sélection",
		BOOK_NOW_BUTTON: "Réserver maintenant",
		TOAST_DATE_CONFLICT: "Votre sélection contient des dates déjà réservées. Veuillez choisir une autre période.",
		TOAST_MISSING_STAYING_DATES: "Veuillez d'abord sélectionner les dates d'arrivée et de départ.",
		TOAST_DATES_AVAILABLE: "Les dates sélectionnées sont disponibles à la réservation.",
		TOAST_DATES_CONFLICT: "Certaines dates de votre sélection sont déjà réservées.",
		TOAST_FAILED_AVAILABILITY_CHECK: "Échec de la vérification de disponibilité. Veuillez réessayer."
	},
	de: {
		ROOM_LABEL: "Zimmer",
		TO_LABEL: "bis",
		LOADING_CALENDAR: "Kalender wird geladen...",
		SELECT_AVAILABILITY_DATES: "Wählen Sie die Daten, um die Verfügbarkeit zu prüfen",
		TOTAL_NIGHTS: "Gesamtnächte",
		SELECT_DATE: "Datum auswählen",
		PREVIOUS_MONTH_BTN: "Zurück",
		NEXT_MONTH_BTN: "Weiter",
		CLEAR_SELECTION: "Auswahl löschen",
		BOOK_NOW_BUTTON: "Jetzt buchen",
		TOAST_DATE_CONFLICT: "Ihre Auswahl enthält bereits gebuchte Daten. Bitte wählen Sie einen anderen Zeitraum.",
		TOAST_MISSING_STAYING_DATES: "Bitte wählen Sie zuerst Check-in- und Check-out-Daten.",
		TOAST_DATES_AVAILABLE: "Ihre ausgewählten Daten sind für die Buchung verfügbar.",
		TOAST_DATES_CONFLICT: "Einige Daten in Ihrer Auswahl sind bereits gebucht.",
		TOAST_FAILED_AVAILABILITY_CHECK: "Verfügbarkeitsprüfung fehlgeschlagen. Bitte versuchen Sie es erneut."
	},
	es: {
		ROOM_LABEL: "Habitación",
		TO_LABEL: "a",
		LOADING_CALENDAR: "Cargando calendario...",
		SELECT_AVAILABILITY_DATES: "Seleccione las fechas para comprobar la disponibilidad",
		TOTAL_NIGHTS: "Noches totales",
		SELECT_DATE: "Seleccionar fecha",
		PREVIOUS_MONTH_BTN: "Anterior",
		NEXT_MONTH_BTN: "Siguiente",
		CLEAR_SELECTION: "Borrar selección",
		BOOK_NOW_BUTTON: "Reservar ahora",
		TOAST_DATE_CONFLICT: "Su selección contiene fechas ya reservadas. Seleccione un rango diferente.",
		TOAST_MISSING_STAYING_DATES: "Seleccione primero las fechas de entrada y salida.",
		TOAST_DATES_AVAILABLE: "Las fechas seleccionadas están disponibles para reservar.",
		TOAST_DATES_CONFLICT: "Algunas fechas de su selección ya están reservadas.",
		TOAST_FAILED_AVAILABILITY_CHECK: "Error al comprobar la disponibilidad. Inténtelo de nuevo."
	}
}

type StringsType = keyof typeof strings;

function getLocaleStrings(locale: string) {
	let strs = strings[locale as StringsType];
	if (!strs) return strings.en;
	return strs;
}

interface BookingCalendarProps {
	roomId: string;
	roomName: string;
	locale: string;
	onDateSelect?: (startDate: string | null, endDate: string | null) => void;
	onBooking?: (bookingData: { roomId: string; startDate: string; endDate: string; totalNights: number }) => void;
	initialMonth?: Date;
	className?: string;
}

interface DateRange {
	start: string | null;
	end: string | null;
}

interface BookingData {
	startDate: string;
	endDate: string;
}

const MONTH_NAMES = {
	en: ["January", "February", "March", "April", "May", "June","July", "August", "September", "October", "November", "December"],
	it: ["Gennaio", "Febbraio", "Marzo", "Aprile", "Maggio", "Giugno", "Luglio", "Agosto", "Settembre", "Ottobre", "Novembre", "Dicembre"],
	fr: ["Janvier", "Février", "Mars", "Avril", "Mai", "Juin", "Juillet", "Août", "Septembre", "Octobre", "Novembre", "Décembre"],
	de: ["Januar", "Februar", "März", "April", "Mai", "Juni", "Juli", "August", "September", "Oktober", "November", "Dezember"],
	es: ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"]
};

const DAY_NAMES = [
	{en: "Sun", it: "Dom", fr: "Dim", de: "So", es: "Dom"},
	{en: "Mon", it: "Lun", fr: "Lun", de: "Mo", es: "Lun"},
	{en: "Tue", it: "Mar", fr: "Mar", de: "Di", es: "Mar"},
	{en: "Wed", it: "Mer", fr: "Mer", de: "Mi", es: "Mié"},
	{en: "Thu", it: "Gio", fr: "Jeu", de: "Do", es: "Jue"},
	{en: "Fri", it: "Ven", fr: "Ven", de: "Fr", es: "Vie"},
	{en: "Sat", it: "Sab", fr: "Sam", de: "Sa", es: "Sáb"},
];

const gBookings = new Map();

const useBookingsForRoom = (roomId: string, year: number, month: number) => {
	const [data, setData] 			= useState<BookingData[]>([]);
	const [isLoading, setIsLoading] = useState<boolean>(true);
	useEffect(() => {
		const fetchBookings = async () => {
			const data = await axiosInstance.get(
				  `/api/get-bookings/${roomId}?year=${year}&month=${month}`,
				  { withCredentials: true }
				)
				.then((res) => res.data);
			
			const bookings = data.bookings || [];
			for (const booking of bookings)
				gBookings.set(booking._id, booking);

			setData(Array.from(gBookings.values()));
			setIsLoading(false);
		};

		if (isLoading) {
			fetchBookings();
		}
	}, [isLoading]);


	useEffect(() => {
		gBookings.clear();
	}, []);

	return {data, isLoading, setIsLoading};
};

export default function BookingCalendar({
	roomId,
	roomName,
	onDateSelect,
	onBooking,
	className,
	locale = 'en-US',
	initialMonth = new Date(),	
}: BookingCalendarProps) {
	const [currentMonth, setCurrentMonth] = useState(initialMonth);
	const [selectedRange, setSelectedRange] = useState<DateRange>({ start: null, end: null });
	const [isCheckingAvailability, setIsCheckingAvailability] = useState(false);
	const { toast } = useToast();

	const strs = getLocaleStrings(locale);

	// Fetch existing bookings for the room
	const { data: roomBookings, isLoading: isLoadingBookings, setIsLoading } = useBookingsForRoom(roomId, currentMonth.getFullYear(), currentMonth.getMonth() + 1);

	const bookedDates = roomBookings;

	// Generate calendar days for current month
	const generateCalendarDays = () => {
		const year = currentMonth.getFullYear();
		const month = currentMonth.getMonth();

		const firstDayOfMonth = new Date(year, month, 1);
		const lastDayOfMonth = new Date(year, month + 1, 0);
		const firstCalendarDay = new Date(firstDayOfMonth);
		firstCalendarDay.setDate(firstCalendarDay.getDate() - firstDayOfMonth.getDay());

		const days = [];
		const currentDate = new Date(firstCalendarDay);

		// Generate 42 days (6 weeks) to fill the calendar grid
		for (let i = 0; i < 42; i++) {
			days.push(new Date(currentDate));
			currentDate.setDate(currentDate.getDate() + 1);
		}

		return days;
	};

	const calendarDays = generateCalendarDays();

	// Check if a date is booked
	const isDateBooked = (date: Date) => {
		return bookedDates.some((booking: BookingData) => {
			return date >= new Date(booking.startDate) && date <= new Date(booking.endDate);
		});
	};

	// Check if a date is in the current month
	const isCurrentMonth = (date: Date) => {
		return date.getMonth() === currentMonth.getMonth() && date.getFullYear() === currentMonth.getFullYear();
	};

	// Check if a date is in the past
	const isPastDate = (date: Date) => {
		const today = new Date();
		today.setHours(0, 0, 0, 0);
		return date < today;
	};

	// Format date as YYYY-MM-DD
	const formatDate = (date: Date) => {
		return date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate();
	};

	// Handle date selection
	const handleDateClick = (date: Date) => {
		if (!isCurrentMonth(date) || isPastDate(date) || isDateBooked(date)) {
			return;
		}

		const dateStr = formatDate(date);

		if (!selectedRange.start || (selectedRange.start && selectedRange.end)) {
			// Start new selection
			const newRange = { start: dateStr, end: null };
			setSelectedRange(newRange);
			onDateSelect?.(newRange.start, newRange.end);
		} else if (selectedRange.start && !selectedRange.end) {
			// Complete the range
			const startDate = new Date(selectedRange.start);
			const endDate = date;
			const comparingDate = {date: date};

			let dateRange = {start: selectedRange.start, end: selectedRange.end};
			
			if (endDate < startDate) {
				dateRange.start = dateStr;
				dateRange.end 	= selectedRange.start;
				comparingDate.date = new Date(dateRange.end);
			} else {
				dateRange.end = dateStr;
			}
			
			// Check if there are any booked dates in the range
			const hasBookedDatesInRange = bookedDates.some((booking: BookingData) => {
				const bookingStartDate = new Date(booking.startDate);
				const bookingEndDate   = new Date(booking.endDate);
				const rangeStart 	   = new Date(dateRange.start!);

				return (bookingStartDate > rangeStart && bookingStartDate < comparingDate.date) ||
					(bookingEndDate > rangeStart && bookingEndDate < comparingDate.date) ||
					(bookingStartDate <= rangeStart && bookingEndDate >= comparingDate.date);
			});

			if (hasBookedDatesInRange) {
				_toast(strs.TOAST_DATE_CONFLICT, {type: "error"});
				setSelectedRange({start: null, end: null});
				onDateSelect?.(null, null);
				return;
			}

			const newRange = { start: dateRange.start, end: dateRange.end };
			setSelectedRange(newRange);
			onDateSelect?.(newRange.start, newRange.end);
		}
	};

	// Check if a date is selected
	const isDateSelected = (date: Date) => {
		const dateStr = formatDate(date);
		return dateStr === selectedRange.start || dateStr === selectedRange.end;
	};

	// Check if a date is in the selected range
	const isInSelectedRange = (date: Date) => {
		if (!selectedRange.start || !selectedRange.end) return false;
		
		const _start = new Date(selectedRange.start);
		const _end	 = new Date(selectedRange.end);

		return date > _start && date < _end;
	};

	// Calculate total nights
	const calculateTotalNights = () => {
		if (!selectedRange.start || !selectedRange.end) return 0;
		const start = new Date(selectedRange.start);
		const end = new Date(selectedRange.end);
		const diffTime = end.getTime() - start.getTime();
		return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
	};

	// Navigate months
	const goToPreviousMonth = () => {
		setCurrentMonth(prev => new Date(prev.getFullYear(), prev.getMonth() - 1, 1));
		setIsLoading(true);
	};

	const goToNextMonth = () => {
		setCurrentMonth(prev => new Date(prev.getFullYear(), prev.getMonth() + 1, 1));
		setIsLoading(true);
	};

	// Clear selection
	const clearSelection = () => {
		setSelectedRange({ start: null, end: null });
		onDateSelect?.(null, null);
	};

	// Check availability
	const checkAvailability = async () => {
		if (!selectedRange.start || !selectedRange.end) {
			_toast(strs.TOAST_MISSING_STAYING_DATES, {type: "error"});
			return false;
		}

		let conflict = false;

		setIsCheckingAvailability(true);
		try {
			const response = await axiosInstance.get(
				`/api/bookings/check-conflict?roomId=${roomId}&startDate=${selectedRange.start}&endDate=${selectedRange.end}`
			).then(res => res.data);

			conflict = response.hasConflict;
			
			if (!conflict) {
				_toast(strs.TOAST_DATES_AVAILABLE, {type: "success"});
			} else {
				clearSelection();
				setIsLoading(true);
				_toast(strs.TOAST_DATES_CONFLICT, {type: "error"});
			}
		} catch (error) {
			_toast(strs.TOAST_FAILED_AVAILABILITY_CHECK, {type: "error"});
			return false;
		} finally {
			setIsCheckingAvailability(false);
			return !conflict;
		}
	};

	// Proceed to booking
	const proceedToBooking = async () => {
		if (!selectedRange.start || !selectedRange.end) {
			_toast(strs.TOAST_MISSING_STAYING_DATES, {type: "error"});
			return;
		}

		// const status = await checkAvailability();

		if (!(await checkAvailability()))
			return;


		const totalNights = calculateTotalNights();

		onBooking?.({
			roomId,
			startDate: selectedRange.start,
			endDate: selectedRange.end,
			totalNights
		});
	};

	return (
		<div className={cn("bg-white rounded-xl shadow-lg overflow-hidden", className)}>
			{/* Calendar Header */}
			<div className="bg-booking-blue text-white px-6 py-4">
				<div className="flex items-center justify-between column-on-mobile">
					<h2 className="text-xl font-semibold">{strs.ROOM_LABEL} {roomName}</h2>
					<div className="text-sm opacity-90">
						{selectedRange.start && selectedRange.end
							? `${selectedRange.start} ${strs.TO_LABEL} ${selectedRange.end}`
							: strs.SELECT_AVAILABILITY_DATES
						}
					</div>
				</div>
			</div>

			{/* Selected Date Range Display */}
			<div className="px-6 py-4 bg-gray-50 border-b">
				<div className="flex items-center justify-between flex-wrap gap-4 w-full">
					<div className="flex items-center space-x-4 jsb w-full">
						<div className="flex items-center space-x-2">
							<Calendar className="h-5 w-5 text-booking-blue" />
							<div>
								<div className="text-xs text-gray-500 uppercase tracking-wide">Check-in</div>
								<div className="font-semibold">
									{selectedRange.start ? new Date(selectedRange.start).toLocaleDateString(locale) : strs.SELECT_DATE}
								</div>
							</div>
						</div>
						<div className="hidden sm:block w-8 border-t border-gray-300"></div>
						<div className="flex items-center space-x-2">
							<CalendarDays className="h-5 w-5 text-booking-blue" />
							<div>
								<div className="text-xs text-gray-500 uppercase tracking-wide">Check-out</div>
								<div className="font-semibold">
									{selectedRange.end ? new Date(selectedRange.end).toLocaleDateString(locale) : strs.SELECT_DATE}
								</div>
							</div>
						</div>
					</div>
					<div className="text-right">
						<div className="text-xs text-gray-500 uppercase tracking-wide">{strs.TOTAL_NIGHTS}</div>
						<div className="font-semibold text-booking-blue">{calculateTotalNights()}</div>
					</div>
				</div>
			</div>

			{/* Month Navigation */}
			<div className="px-6 py-4 bg-white border-b">
				<div className="flex items-center justify-between">
					<Button
						variant="ghost"
						onClick={goToPreviousMonth}
						className="flex items-center space-x-2 hover:bg-gray-100"
					>
						<ChevronLeft className="h-4 w-4" />
						<span className="text-sm hide-on-mobile">{strs.PREVIOUS_MONTH_BTN}</span>
					</Button>

					<h3 className="text-lg font-semibold text-gray-900">
						{((MONTH_NAMES as any)[locale] || MONTH_NAMES.en)[currentMonth.getMonth()]} {currentMonth.getFullYear()}
					</h3>

					<Button
						variant="ghost"
						onClick={goToNextMonth}
						className="flex items-center space-x-2 hover:bg-gray-100"
					>
						<span className="text-sm hide-on-mobile">{strs.NEXT_MONTH_BTN}</span>
						<ChevronRight className="h-4 w-4" />
					</Button>
				</div>
			</div>

			{/* Calendar Grid */}
			<div className="p-6">
				{isLoadingBookings ? (
					<div className="flex items-center justify-center py-12">
						<div className="flex items-center space-x-3">
							<Loader2 className="h-6 w-6 animate-spin text-booking-blue" />
							<span className="text-gray-600">{strs.LOADING_CALENDAR}</span>
						</div>
					</div>
				) : (
					<div>
						{/* Days of Week Header */}
						<div className="grid grid-cols-7 gap-1 mb-2">
							{DAY_NAMES.map(day => (
								<div key={(day as any)[locale]} className="text-center text-xs font-medium text-gray-500 py-2">
									{(day as any)[locale] || day.en}
								</div>
							))}
						</div>

						{/* Calendar Days Grid */}
						<div className="grid grid-cols-7 gap-1">
							{calendarDays.map((date, index) => {
								const isBooked = isDateBooked(date);
								const isPast = isPastDate(date);
								const isCurrentMonthDate = isCurrentMonth(date);
								const isSelected = isDateSelected(date);
								const isInRange = isInSelectedRange(date);
								const isAvailable = isCurrentMonthDate && !isPast && !isBooked;
								const inRangeAndLast = isInRange && formatDate(date) == selectedRange.end;

								return (
									<div
										key={index}
										onClick={() => handleDateClick(date)}
										className={cn(
											"aspect-square flex items-center justify-center text-sm font-medium rounded-lg transition-all duration-200 border-2 border-transparent relative",
											{
												// Unavailable dates (past or not current month)
												"text-gray-300 cursor-not-allowed": !isCurrentMonthDate || isPast,

												// Booked dates
												"bg-booking-orange text-white cursor-not-allowed": isBooked,

												// Available dates
												"cursor-pointer hover:bg-booking-blue hover:text-white hover:scale-105 hover:border-booking-blue": isAvailable,

												// Selected dates
												"bg-booking-blue text-white border-booking-blue-dark shadow-md font-bold": isSelected,

												// Range dates
												"bg-booking-yellow bg-opacity-20 text-booking-blue hover:bg-opacity-30": isInRange && !inRangeAndLast,
											}
										)}
									>
										<span>{date.getDate()}</span>
										{isBooked && (
											<div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full border-2 border-white"></div>
										)}
									</div>
								);
							})}
						</div>
					</div>
				)}

				{/* Legend */}
				{/* <div className="mt-6 pt-6 border-t border-gray-200">
					<h4 className="text-sm font-medium text-gray-700 mb-3">Legend</h4>
					<div className="flex flex-wrap gap-4 text-sm">
						<div className="flex items-center space-x-2">
							<div className="w-4 h-4 rounded border-2 border-booking-blue hover:bg-booking-blue transition-colors"></div>
							<span className="text-gray-600">Available</span>
						</div>
						<div className="flex items-center space-x-2">
							<div className="w-4 h-4 rounded bg-booking-blue"></div>
							<span className="text-gray-600">Selected</span>
						</div>
						<div className="flex items-center space-x-2">
							<div className="w-4 h-4 rounded bg-booking-yellow bg-opacity-20 border border-booking-yellow"></div>
							<span className="text-gray-600">Selected Range</span>
						</div>
						<div className="flex items-center space-x-2">
							<div className="w-4 h-4 rounded bg-booking-orange relative">
								<div className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full border border-white"></div>
							</div>
							<span className="text-gray-600">Booked</span>
						</div>
						<div className="flex items-center space-x-2">
							<div className="w-4 h-4 rounded bg-gray-200"></div>
							<span className="text-gray-600">Unavailable</span>
						</div>
					</div>
				</div> */}
			</div>

			{/* Action Buttons */}
			<div className="px-6 py-4 bg-gray-50 border-t flex items-center justify-between flex-wrap gap-4">
				<Button
					variant="ghost"
					onClick={clearSelection}
					className="text-gray-600 hover:text-gray-800"
				>
					{strs.CLEAR_SELECTION}
				</Button>
				<div className="flex space-x-3">
					<Button
						onClick={proceedToBooking}
						disabled={!selectedRange.start || !selectedRange.end}
						className="bg-booking-green hover:bg-green-600 text-white shadow-sm hover:shadow-md transform hover:scale-105 transition-all duration-200"
					>
						{strs.BOOK_NOW_BUTTON}
					</Button>
				</div>
			</div>
		</div>
	);
}
