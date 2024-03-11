import { Box, VStack, Heading, IconButton, Input, HStack, useToast, List, ListItem, ListIcon, Text, useColorModeValue, useColorMode } from "@chakra-ui/react";
import { FaPlus, FaSun, FaMoon, FaTrash } from "react-icons/fa";
import { useState } from "react";

const Index = () => {
  const [todos, setTodos] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const toast = useToast();
  const { colorMode, toggleColorMode } = useColorMode();
  const bgColor = useColorModeValue("gray.100", "gray.700");
  const textColor = useColorModeValue("gray.700", "gray.100");

  const handleInputChange = (e) => setInputValue(e.target.value);

  const handleAddTodo = () => {
    if (inputValue.trim() === "") {
      toast({
        title: "No content",
        description: "Please enter a todo!",
        status: "warning",
        duration: 2000,
        isClosable: true,
      });
      return;
    }

    setTodos([...todos, { id: Date.now(), content: inputValue }]);
    setInputValue("");
  };

  const handleDeleteTodo = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleAddTodo();
    }
  };

  return (
    <Box p={4} bg={bgColor} minH="100vh">
      <VStack spacing={8}>
        <IconButton icon={colorMode === "light" ? <FaMoon /> : <FaSun />} isRound="true" size="lg" alignSelf="flex-end" onClick={toggleColorMode} />
        <VStack spacing={4} w="100%">
          <Heading size="2xl" color={textColor}>
            Todo List
          </Heading>
          <HStack w="100%">
            <Input placeholder="Add your new todo" value={inputValue} onChange={handleInputChange} onKeyPress={handleKeyPress} variant="filled" />
            <IconButton icon={<FaPlus />} onClick={handleAddTodo} colorScheme="green" aria-label="Add todo" />
          </HStack>
          <List w="100%" spacing={3}>
            {todos.map((todo) => (
              <ListItem key={todo.id} p={2} bg={useColorModeValue("white", "gray.600")} borderRadius="lg" shadow="md">
                <HStack justify="space-between">
                  <HStack>
                    <ListIcon as={FaPlus} color="green.500" />
                    <Text color={textColor}>{todo.content}</Text>
                  </HStack>
                  <IconButton icon={<FaTrash />} size="sm" colorScheme="red" aria-label="Delete todo" onClick={() => handleDeleteTodo(todo.id)} />
                </HStack>
              </ListItem>
            ))}
          </List>
        </VStack>
      </VStack>
    </Box>
  );
};

export default Index;
