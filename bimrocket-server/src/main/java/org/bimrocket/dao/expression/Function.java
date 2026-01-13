/*
 * BIMROCKET
 *
 * Copyright (C) 2021-2025, Ajuntament de Sant Feliu de Llobregat
 *
 * This program is licensed and may be used, modified and redistributed under
 * the terms of the European Public License (EUPL), either version 1.1 or (at
 * your option) any later version as soon as they are approved by the European
 * Commission.
 *
 * Alternatively, you may redistribute and/or modify this program under the
 * terms of the GNU Lesser General Public License as published by the Free
 * Software Foundation; either  version 3 of the License, or (at your option)
 * any later version.
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
 * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *
 * See the licenses for the specific language governing permissions, limitations
 * and more details.
 *
 * You should have received a copy of the EUPL1.1 and the LGPLv3 licenses along
 * with this program; if not, you may find them at:
 *
 * https://joinup.ec.europa.eu/software/page/eupl/licence-eupl
 * http://www.gnu.org/licenses/
 * and
 * https://www.gnu.org/licenses/lgpl.txt
 */
package org.bimrocket.dao.expression;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import static org.bimrocket.dao.expression.Expression.ANY;
import static org.bimrocket.dao.expression.Expression.BOOLEAN;
import static org.bimrocket.dao.expression.Expression.NUMBER;
import static org.bimrocket.dao.expression.Expression.STRING;

/**
 *
 * @author realor
 */
public class Function
{
  private static final String _OPERAND_1 = "operand1";
  private static final String _OPERAND_2 = "operand2";
  private static final String _OPERAND_N = "operandN";
  private static final String _VALUE = "value";
  private static final String _STRING_VALUE = "stringValue";
  private static final String _SUBSTRING = "substring";

  public static final Function OR = define("or", BOOLEAN)
    .argument(_OPERAND_1, BOOLEAN)
    .argument(_OPERAND_2, BOOLEAN)
    .chainArg(_OPERAND_N, BOOLEAN)
    .build();
  public static final Function AND = define("and", BOOLEAN)
    .argument(_OPERAND_1, BOOLEAN)
    .argument(_OPERAND_2, BOOLEAN)
    .chainArg(_OPERAND_N, BOOLEAN)
    .build();
  public static final Function NOT = define("not", BOOLEAN)
    .argument("operand", BOOLEAN)
    .build();
  public static final Function EQ = define("eq", BOOLEAN)
    .argument(_OPERAND_1, ANY)
    .argument(_OPERAND_2, ANY)
    .build();
  public static final Function NE = define("ne", BOOLEAN)
    .argument(_OPERAND_1, ANY)
    .argument(_OPERAND_2, ANY)
    .build();
  public static final Function LT = define("lt", BOOLEAN)
    .argument(_OPERAND_1, ANY)
    .argument(_OPERAND_2, ANY)
    .build();
  public static final Function GT = define("gt", BOOLEAN)
    .argument(_OPERAND_1, ANY)
    .argument(_OPERAND_2, ANY)
    .build();
  public static final Function LE = define("le", BOOLEAN)
    .argument(_OPERAND_1, ANY)
    .argument(_OPERAND_2, ANY)
    .build();
  public static final Function GE = define("ge", BOOLEAN)
    .argument(_OPERAND_1, ANY)
    .argument(_OPERAND_2, ANY)
    .build();
  public static final Function ADD = define("add", NUMBER)
    .argument(_OPERAND_1, NUMBER)
    .argument(_OPERAND_2, NUMBER)
    .chainArg(_OPERAND_N, NUMBER)
    .build();
  public static final Function SUB = define("sub", NUMBER)
    .argument(_OPERAND_1, NUMBER)
    .argument(_OPERAND_2, NUMBER)
    .chainArg(_OPERAND_N, NUMBER)
    .build();
  public static final Function MUL = define("mul", NUMBER)
    .argument("operand1", NUMBER)
    .argument(_OPERAND_2, NUMBER)
    .chainArg(_OPERAND_N, NUMBER)
    .build();
  public static final Function DIV = define("div", NUMBER)
    .argument(_OPERAND_1, NUMBER)
    .argument(_OPERAND_2, NUMBER)
    .chainArg(_OPERAND_N, NUMBER)
    .build();
  public static final Function MOD = define("mod", NUMBER)
    .argument(_OPERAND_1, NUMBER)
    .argument(_OPERAND_2, NUMBER)
    .chainArg(_OPERAND_N, NUMBER)
    .build();
  public static final Function NEG = define("neg", NUMBER)
    .argument("operand", NUMBER)
    .build();
  public static final Function ROUND = define("round", NUMBER)
    .argument(_VALUE, NUMBER)
    .build();
  public static final Function FLOOR = define("floor", NUMBER)
    .argument(_VALUE, NUMBER)
    .build();
  public static final Function CEIL = define("ceil", NUMBER)
    .argument(_VALUE, NUMBER)
    .build();
  public static final Function CONTAINS = define("contains", BOOLEAN)
    .argument(_STRING_VALUE, STRING)
    .argument(_SUBSTRING, STRING)
    .build();
  public static final Function STARTSWITH = define("startsWith", BOOLEAN)
    .argument(_STRING_VALUE, STRING)
    .argument(_SUBSTRING, STRING)
    .build();
  public static final Function ENDSWITH = define("endsWith", BOOLEAN)
    .argument(_STRING_VALUE, STRING)
    .argument(_SUBSTRING, STRING)
    .build();
  public static final Function SUBSTRING = define(_SUBSTRING, STRING)
    .argument(_STRING_VALUE, STRING)
    .argument("start", NUMBER, "start index (0 based)")
    .argument("end", NUMBER, "end index (0 based)")
    .build();
  public static final Function LENGTH = define("length", NUMBER)
    .argument(_STRING_VALUE, STRING)
    .build();
  public static final Function CONCAT = define("concat", STRING)
    .argument("stringValue1", STRING)
    .argument("stringValue2", STRING)
    .chainArg("stringValueN", STRING)
    .build();
  public static final Function TOLOWERCASE = define("toLowerCase", STRING)
    .argument(_STRING_VALUE, STRING)
    .build();
  public static final Function TOUPPERCASE = define("toUpperCase", STRING)
    .argument(_STRING_VALUE, STRING)
    .build();
  public static final Function TRIM = define("trim", STRING)
    .argument(_STRING_VALUE, STRING)
    .build();
  public static final Function TOSTRING = define("toString", STRING)
    .argument(_VALUE, ANY)
    .build();
  public static final Function TONUMBER = define("toNumber", NUMBER)
    .argument(_VALUE, ANY)
    .build();
  public static final Function TOBOOLEAN = define("toBoolean", BOOLEAN)
    .argument(_VALUE, ANY)
    .build();

  final String name;
  final String type;
  final String description;
  final List<Argument> arguments;
  final Argument chainableArgument;

  Function(String name, String type, String description,
    List<Argument> arguments, Argument chainableArgument)
  {
    this.name = name;
    this.type = type;
    this.description = description;
    this.arguments = Collections.unmodifiableList(arguments);
    this.chainableArgument = chainableArgument;
  }

  public String getName()
  {
    return name;
  }

  public String getType()
  {
    return type;
  }

  public String getDescription()
  {
    return description;
  }

  public List<Argument> getArguments()
  {
    return arguments;
  }

  public int getArgumentCount()
  {
    return arguments.size();
  }

  public Argument getArgument(int index)
  {
    Argument argument = null;
    if (index >= 0)
    {
      int count = arguments.size();

      if (index < count)
      {
        argument = arguments.get(index);
      }
      else if (chainableArgument != null)
      {
        argument = chainableArgument;
      }
    }
    return argument;
  }

  public Argument getChainableArgument()
  {
    return chainableArgument;
  }

  public boolean isSingleArgument()
  {
    return arguments.size() == 1 && chainableArgument == null;
  }

  @Override
  public String toString()
  {
    StringBuilder buffer = new StringBuilder();
    buffer.append(name);
    buffer.append('(');
    for (int i = 0; i < arguments.size(); i++)
    {
      if (i > 0) buffer.append(", ");
      Argument argument = arguments.get(i);
      buffer.append(argument.name).append(":").append(argument.type);
    }
    if (chainableArgument != null)
    {
      Argument argument = chainableArgument;
      buffer.append(", ... ");
      buffer.append(argument.name).append(":").append(argument.type);
    }
    buffer.append(')');

    return buffer.toString();
  }

  public static Builder define(String name, String type)
  {
    Builder builder = new Builder();
    builder.name = name;
    builder.type = type;
    return builder;
  }

  public static class Argument
  {
    private final String name;
    private final String type;
    private final String description;

    public Argument(String name, String type)
    {
      this(name, type, null);
    }

    public Argument(String name, String type, String description)
    {
      this.name = name;
      this.type = type;
      this.description = description;
    }

    public String getName()
    {
      return name;
    }

    public String getType()
    {
      return type;
    }

    public String getDescription()
    {
      return description;
    }
  }

  public static class Builder
  {
    private String name;
    private String type;
    private String description;
    private final List<Argument> arguments = new ArrayList<>();
    private Argument chainableArgument;

    public Builder description(String description)
    {
      this.description = description;
      return this;
    }

    public Builder argument(String name, String type)
    {
      arguments.add(new Argument(name, type));
      return this;
    }

    public Builder argument(String name, String type, String description)
    {
      arguments.add(new Argument(name, type, description));
      return this;
    }

    public Builder chainArg(String name, String type)
    {
      chainableArgument = new Argument(name, type);
      return this;
    }

    public Builder chainArg(String name, String type, String description)
    {
      chainableArgument = new Argument(name, type, description);
      return this;
    }

    public Function build()
    {
      return new Function(name, type, description, arguments, chainableArgument);
    }
  }
}
